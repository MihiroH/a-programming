import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import BaseText from '@/components/BaseText'
import { useWindowMedia } from '@/hooks/useWindowMedia'
import styles from '@/styles/Sample.module.sass'

type Props = {
  className?: string
}

const Sample: React.VFC<Props> = ({ className }) => {
  const media = useWindowMedia()
  const [visibleLanguages, setVisibleLanguages] = useState<Array<string>>([])
  const [selectedTab, setSelectedTab] = useState('HTML')
  const tabs = useMemo(() => ['HTML', 'CSS', 'JavaScript'], [])
  const codeAreaWrapperEl = useRef<HTMLDivElement>(null)
  const resultLastEl = useRef<HTMLButtonElement>(null)

  const switchTab = (tab: string) => {
    if (media === 'desctop') {
      return
    }

    setSelectedTab(tab)
  }

  const isTabContentVisible = (tab: string) => {
    if (media === 'desctop') {
      return true
    }

    return selectedTab === tab
  }

  // Convert html special character.(Special character → Normal characters)
  const toNormalCharacters = (text: string) => {
    const regex = /&#x([0-9A-Fa-f]+);|&#(\d+);|&\w+;/g
    const map: { [key: string]: string } = {
      '&nbsp;': ' ',
      '&lt;': '<',
      '&gt;': '>',
      '&amp;': '&',
      '&quot;': '"',
      '&apos;': '\'',
      '&copy;': '©',
    }

    return text.replace(regex, (match: string, p1: string, p2: number) => {
      if (match.charAt(1) == '#') {
        // Numeric character reference.
        if (match.charAt(2) == 'x') {
          return String.fromCharCode(parseInt(p1, 16))
        } else {
          return String.fromCharCode(p2 - 0)
        }
      } else if (Object.prototype.hasOwnProperty.call(map, match)) {
        // Predefined character entity reference.
        return map[match]
      }
      return match
    })
  }

  const setupTypewriter = useCallback((t: HTMLElement) => {
    const html = t.innerHTML

    t.innerHTML = ''

    let cursorPosition = 0
    let tagStr = ''
    let node: HTMLElement | null
    let writingStartTag = false
    let tagOpen = false
    let stock = ''
    let skip = false
    const typeSpeed = 10

    const typeAll = (): Promise<void> => {
      return new Promise((resolve) => {
        const type = () => {
          // If it's at the end of the string.
          const end = !html[cursorPosition]
          if (end) {
            resolve()
            return
          }

          // If end tag, write is skipped.(<\/.*>)
          if (skip) {
            skip = html[cursorPosition] !== '>'
            node = skip ? node : null
            cursorPosition++
            type()
            return
          }

          if (html[cursorPosition] === '<') {
            // Start end tag.
            if (tagOpen) {
              tagOpen = false
              writingStartTag = false
              skip = true
              cursorPosition++
              type()
              return
            }

            // Start start tag.(<[^/].*>)
            tagOpen = true
            writingStartTag = true
            tagStr += html[cursorPosition]
            cursorPosition++
            type()
            return
          }

          // Write Start tag.
          if (writingStartTag && html[cursorPosition] !== '>') {
            tagStr += html[cursorPosition]
            cursorPosition++
            type()
            return
          }

          // Create a DOM at the end of the start tag.
          if (writingStartTag && html[cursorPosition] === '>') {
            const tagName = tagStr.split(' ')[0].replace(/^</, '')
            tagStr += `></${tagName}>`

            const tempEl = document.createElement('div')
            tempEl.innerHTML = tagStr

            if (tempEl.firstChild) {
              node = t.appendChild(tempEl.firstChild) as HTMLElement
            }

            tagStr = ''
            writingStartTag = false
            cursorPosition++
            type()
            return
          }

          // Start character entity reference.(^&.*;$)
          if (html[cursorPosition] === '&') {
            stock = html[cursorPosition]
            cursorPosition++
            type()
            return
          }

          let text = html[cursorPosition]

          if (stock) {
            stock += html[cursorPosition]
            // End to write character entity reference.
            if (/^&.*;$/.test(stock)) {
              text = toNormalCharacters(stock)
              stock = ''
            } else {
              // Write character entity reference.
              cursorPosition++
              type()
              return
            }
          }

          // If the text was originally in the DOM.
          if (node) {
            node.innerHTML += text
          } else {
            t.innerHTML += text
          }

          setTimeout(() => {
            cursorPosition++
            type()
          }, typeSpeed)
        }

        // Start writing.
        type()
      })
    }

    return { typeAll }
  }, [])

  const animate = useCallback(() => {
    if (!media) {
      return
    }

    const codes = document.querySelectorAll('[data-code]')

    if (!codes) {
      return
    }

    if (media === 'desctop') {
      (async () => {
        for (const code of Array.from(codes)) {
          if (!(code instanceof HTMLElement)) {
            continue
          }

          setVisibleLanguages((old) => [...old, code.dataset.code || ''])
          const typewriter = setupTypewriter(code)
          await typewriter.typeAll()
        }
      })()

      return
    }

    setVisibleLanguages(() => tabs)

    const code = document.querySelector('[data-code="HTML"]')
    if (!(code instanceof HTMLElement)) {
      return
    }

    const typewriter = setupTypewriter(code)
    typewriter.typeAll()
  }, [media, tabs, setupTypewriter])

  useEffect(() => {
    if (!codeAreaWrapperEl.current) {
      return
    }

    if (!('IntersectionObserver' in window)) {
      return
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    }

    const codeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          animate()
          codeObserver.unobserve(el)
        }
      })
    }, options)

    codeObserver.observe(codeAreaWrapperEl.current)
  }, [animate])

  return (
    <div className={className}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={[
              styles.tab,
              isTabContentVisible(tabs[index + 1]) ? styles.prev : '',
              isTabContentVisible(tab) ? styles.active : '',
            ].join(' ')}
            role="button"
            onClick={() => switchTab(tab)}
          >
            <BaseText face="en" sizeSp={22} sizePc={16}>
              {tab}
            </BaseText>
          </div>
        ))}
      </div>
      <div ref={codeAreaWrapperEl} className={styles.code_area_wrapper}>
        <pre
          className={[styles.code_area, styles.html].join(' ')}
          style={{ display: isTabContentVisible('HTML') ? 'block' : 'none' }}
        >
          <BaseText face="en" sizeSp={20} sizePc={14}>
            <code
              data-code="HTML"
              style={{
                display: visibleLanguages.includes('HTML') ? 'inline' : 'none',
              }}
            >
              <span className={styles.gray}>&lt;</span>
              <span className={styles.red}>p </span>
              <span className={styles.green}>class</span>=
              <span className={styles.blue}>&quot;greeting&quot;</span>
              <span className={styles.gray}>&gt;</span>
              {'\n  Hello 太郎さん!'}
              <span className={styles.gray}>&lt;</span>
              <span className={styles.red}>br /</span>
              <span className={styles.gray}>&gt;</span>
              {'\n  太郎さんに会えて嬉しいです。\n'}
              <span className={styles.gray}>&lt;/</span>
              <span className={styles.red}>p</span>
              <span className={styles.gray}>&gt;</span>
              {'\n\n'}
              <span className={styles.gray}>&lt;</span>
              <span className={styles.red}>button </span>
              <span className={styles.green}>class</span>=
              <span className={styles.blue}>&quot;btn&quot;</span>
              <span className={styles.green}> type</span>=
              <span className={styles.blue}>&quot;button&quot;</span>
              <span className={styles.gray}>&gt;</span>
              {'\n  click me!\n'}
              <span className={styles.gray}>&lt;/</span>
              <span className={styles.red}>button</span>
              <span className={styles.gray}>&gt;</span>
            </code>
          </BaseText>
        </pre>
        <pre
          className={[styles.code_area, styles.css].join(' ')}
          style={{ display: isTabContentVisible('CSS') ? 'block' : 'none' }}
        >
          <BaseText face="en" sizeSp={20} sizePc={14}>
            <code
              data-code="CSS"
              style={{
                display: visibleLanguages.includes('CSS') ? 'inline' : 'none',
              }}
            >
              <span className={styles.green}>.greeting</span>
              {' {\n  font-size'}
              <span className={styles.gray}>: </span>
              <span className={styles.orange}>16</span>
              <span className={styles.purple}>px</span>
              <span className={styles.gray}>;</span>
              {'\n  line-height'}
              <span className={styles.gray}>: </span>
              <span className={styles.orange}>1.5</span>
              <span className={styles.gray}>;</span>
              {'\n  margin'}
              <span className={styles.gray}>: </span>
              <span className={styles.orange}>0</span>
              <span className={styles.gray}>;</span>
              {'\n  padding'}
              <span className={styles.gray}>: </span>
              <span className={styles.orange}>0</span>
              <span className={styles.gray}>;</span>
              {'\n}\n\n'}
              <span className={styles.green}>.btn</span>
              {' {\n  -webkit-appearance'}
              <span className={styles.gray}>: </span>
              <span className={styles.purple}>none</span>
              <span className={styles.gray}>;</span>
              {'\n  -moz-appearance'}
              <span className={styles.gray}>: </span>
              <span className={styles.purple}>none</span>
              <span className={styles.gray}>;</span>
              {'\n  appearance'}
              <span className={styles.gray}>: </span>
              <span className={styles.purple}>none</span>
              <span className={styles.gray}>;</span>
              {'\n  background-color'}
              <span className={styles.gray}>: </span>
              <span className={styles.purple} style={{ background: '#53c0f0' }}>
                #53c0f0
              </span>
              <span className={styles.gray}>;</span>
              {'\n  color'}
              <span className={styles.gray}>: </span>
              <span className={styles.purple} style={{ background: '#f1f1f1' }}>
                #f1f1f1
              </span>
              <span className={styles.gray}>;</span>
              {'\n  border-radius'}
              <span className={styles.gray}>: </span>
              <span className={styles.orange}>6</span>
              <span className={styles.purple}>px</span>
              <span className={styles.gray}>;</span>
              {'\n  font-size'}
              <span className={styles.gray}>: </span>
              <span className={styles.orange}>14</span>
              <span className={styles.purple}>px</span>
              <span className={styles.gray}>;</span>
              {'\n  margin'}
              <span className={styles.gray}>: </span>
              <span className={styles.orange}>16</span>
              <span className={styles.purple}>px 0 0</span>
              <span className={styles.gray}>;</span>
              {'\n  padding'}
              <span className={styles.gray}>: </span>
              <span className={styles.orange}>8</span>
              <span className={styles.purple}>px </span>
              <span className={styles.orange}>23</span>
              <span className={styles.purple}>px</span>
              <span className={styles.gray}>;</span>
              {'\n}'}
            </code>
          </BaseText>
        </pre>
        <pre
          className={[styles.code_area, styles.js].join(' ')}
          style={{
            display: isTabContentVisible('JavaScript') ? 'block' : 'none',
          }}
        >
          <BaseText face="en" sizeSp={20} sizePc={14}>
            <code
              data-code="JavaScript"
              style={{
                display: visibleLanguages.includes('JavaScript')
                  ? 'inline'
                  : 'none',
              }}
            >
              <span className={styles.blue}>var</span>
              {' btn = document.'}
              <span className={styles.red}>querySelector</span>
              {'(\n  '}
              <span className={styles.green}>&apos;.btn&apos;</span>
              {'\n);\n\nbtn.'}
              <span className={styles.red}>addEventListener</span>
              {'(\n'}
              <span className={styles.green}>
                &nbsp;&nbsp;&apos;click&apos;
              </span>
              {',\n'}
              <span className={styles.blue}>&nbsp;&nbsp;function</span>
              {'() {\n'}
              <span className={styles.red}>&nbsp;&nbsp;&nbsp;&nbsp;alert</span>
              {'('}
              <span className={styles.green}>
                &apos;ありがとう! 太郎さん&apos;
              </span>
              {');\n  }\n};'}
            </code>
          </BaseText>
        </pre>
      </div>

      <div className={styles.arrow_box}>
        <div className={styles.arrow_bottom} />
        <div className={styles.arrow_bottom} />
        <div className={styles.arrow_bottom} />
      </div>

      <div className={styles.result}>
        <div className={styles.result_item}>
          <BaseText
            tagName="div"
            face="ja"
            sizeSp={20}
            sizePc={20}
            className={styles.result_item_head}
          >
            <div>
              HTMLのみ
              <BaseText
                face="ja"
                sizeSp={16}
                sizePc={12}
                className={styles.result_item_attention}
              >
                ※一部、本サイトのCSSが適用されています
              </BaseText>
            </div>
          </BaseText>
          <div className={styles.result_item_body}>
            <p>
              Hello 太郎さん!
              <br />
              太郎さんに会えて嬉しいです。
            </p>
            <button type="button">Click me!</button>
          </div>
        </div>
        <div className={styles.result_item}>
          <BaseText
            face="ja"
            sizeSp={20}
            sizePc={20}
            className={styles.result_item_head}
          >
            HTML・CSS
          </BaseText>
          <div className={styles.result_item_body}>
            <BaseText
              tagName="p"
              face="ja"
              weight="r"
              sizeSp={20}
              sizePc={16}
              className={styles.greeting}
            >
              Hello 太郎さん!
              <br />
              太郎さんに会えて嬉しいです。
            </BaseText>
            <button type="button" className={styles.btn}>
              Click me!
            </button>
          </div>
        </div>
        <div className={styles.result_item}>
          <BaseText
            tagName="div"
            face="ja"
            sizeSp={20}
            sizePc={20}
            className={styles.result_item_head}
          >
            <div>
              HTML・CSS・JavaScript
              <BaseText
                face="ja"
                sizeSp={16}
                sizePc={12}
                className={styles.result_item_attention}
              >
                ※click me!を押してみて!!
              </BaseText>
            </div>
          </BaseText>
          <div className={styles.result_item_body}>
            <BaseText
              tagName="p"
              face="ja"
              weight="r"
              sizeSp={20}
              sizePc={16}
              className={styles.greeting}
            >
              Hello 太郎さん!
              <br />
              太郎さんに会えて嬉しいです。
            </BaseText>
            <button
              ref={resultLastEl}
              type="button"
              className={styles.btn}
              onClick={() => alert('ありがとう! 太郎さん')}
            >
              Click me!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sample
