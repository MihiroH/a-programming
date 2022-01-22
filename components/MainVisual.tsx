import Image from 'next/image'
import { useState, useContext, useRef, useCallback } from 'react'
import BaseButton from '@/components/BaseButton'
import BaseText from '@/components/BaseText'
import BaseTextAnimation from '@/components/BaseTextAnimation'
import { NicknameContext } from '@/contexts/index'
import IconQuestion from '@/public/images/icon_question.svg'
import ImageMihiro from '@/public/images/img_mihiro.png'
import ImageYuto from '@/public/images/img_yuto.png'
import styles from '@/styles/MainVisual.module.sass'

type Props = {
  className?: string
  updateNickname: (nickname: string) => void
}

const MainVisual: React.VFC<Props> = ({ className, updateNickname }) => {
  const nickname = useContext(NicknameContext)
  const [animate, setAnimate] = useState(false)
  const [mvHeight, setMvHeight] = useState(0)
  const timerId = useRef<NodeJS.Timer | null>()

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const nickname = e.currentTarget.value
    updateNickname(nickname)

    if (timerId.current) {
      clearTimeout(timerId.current)
    }

    timerId.current = setTimeout(() => {
      setAnimate(!!nickname)
    }, 200)
  }

  const measuredRef = useCallback((node) => {
    if (node) {
      setMvHeight(node.offsetHeight)
    }
  }, [])

  const scrollToContents = () => {
    if (mvHeight) {
      window.scrollTo({ top: mvHeight, behavior: 'smooth' })
    }
  }

  return (
    <div ref={measuredRef} className={[styles.wrapper, className].join(' ')}>
      <div className={styles.inner}>
        <video autoPlay loop muted playsInline>
          <source type="video/mp4" src={'/videos/video_programming.mp4'} />
        </video>
        <div className={styles.content}>
          <BaseText
            tagName="p"
            sizeSp={56}
            sizePc={56}
            className={styles.title}
          >
            <BaseTextAnimation>Hello World!!</BaseTextAnimation>
          </BaseText>
          <div className={styles.body}>
            <label htmlFor="nickname">
              <BaseText
                sizeSp={20}
                sizePc={18}
                className={['pc', styles.label].join(' ')}
              >
                ニックネームを入力してください
              </BaseText>
            </label>
            <div className={styles.input_box}>
              <input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="ニックネーム"
                autoComplete="off"
                className={styles.input}
                onInput={(e) => handleChange(e)}
              />
              <BaseButton
                backgroundColor="black"
                borderColor="neon_blue"
                className={styles.btn}
                onClick={scrollToContents}
              >
                <BaseText sizeSp={30} sizePc={16}>
                  決定
                </BaseText>
              </BaseButton>
            </div>
            <div className={styles.attention}>
              <BaseText
                sizeSp={20}
                sizePc={10}
                className={styles.attention_text}
              >
                ※この情報が保存されることはありません
              </BaseText>
              {/*<div className={styles.attention_icon}>
                <IconQuestion />
              </div>*/}
            </div>
            <div className={styles.greeting}>
              <div>
                <BaseText
                  sizeSp={30}
                  sizePc={22}
                  className={styles.greeting_text}
                >
                  <BaseTextAnimation animate={animate} order={1}>
                    Hello {nickname}さん!
                  </BaseTextAnimation>
                </BaseText>
              </div>
              <div>
                <BaseTextAnimation animate={animate} order={2}>
                  <BaseText
                    sizeSp={30}
                    sizePc={22}
                    className={styles.greeting_text}
                  >
                    Let’s Start!
                  </BaseText>
                </BaseTextAnimation>
              </div>
            </div>
            <div className={styles.scroll} onClick={scrollToContents}>
              <BaseText sizeSp={20} sizePc={18}>
                <span className={styles.scroll_arrow}>&gt;</span>
                <span className={styles.scroll_text}>SCROLL</span>
              </BaseText>
            </div>
          </div>
          <div className={styles['img--mihiro']}>
            <Image src={ImageMihiro} alt="みひろ" />
          </div>
          <div className={styles['img--yuto']}>
            <Image src={ImageYuto} alt="ゆうと" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainVisual
