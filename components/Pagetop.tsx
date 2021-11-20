import Link from 'next/link'
import { useState, useEffect } from 'react'
import BaseText from '@/components/BaseText'
import Arrowup from '@/public/images/icon_arrow_up.svg'
import styles from '@/styles/Pagetop.module.sass'

type Props = {
  disabledElement: string
}

const bottom = 30
const right = 20
const initialPagetopPosition = {
  bottom: `${bottom}px`,
  right: `${right}px`,
}

const Pagetop: React.VFC<Props> = ({ disabledElement }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isSp, setIsSp] = useState(false)
  const [pagetopPosition, setPagetopPosition] = useState(initialPagetopPosition)

  const displayPosition = isSp ? 300 : 500

  useEffect(() => {
    const disabledTimingEl = document.querySelector(disabledElement)
    if (!disabledTimingEl) return

    const screenHeight = window.innerHeight
    window.addEventListener('scroll', () => {
      setIsSp(window.matchMedia('(max-width: 768px)').matches)

      const elRect = disabledTimingEl.getBoundingClientRect()
      const elTop = elRect.top + window.scrollY

      const scrollY = window.pageYOffset
      setIsVisible(scrollY >= displayPosition)

      console.log(scrollY + screenHeight >= elTop + bottom)
      if (scrollY + screenHeight >= elTop + bottom) {
        setPagetopPosition({
          bottom: `${scrollY + screenHeight - elTop + bottom}px`,
          right: `${right}px`,
        })
      } else {
        setPagetopPosition(initialPagetopPosition)
      }
    })
  }, [setIsSp, setIsVisible, displayPosition, disabledElement])

  const toTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      role="link"
      aria-label="Move to top of this page"
      className={[
        styles['wrapper'],
        isVisible ? styles['is-visible'] : '',
      ].join(' ')}
      style={pagetopPosition}
      onClick={toTop}
    >
      <span className={styles.icon}>
        <Arrowup />
      </span>
      <BaseText className={styles.text} sizeSp={20} sizePc={10}>
        ページトップ
      </BaseText>
    </div>
  )
}

export default Pagetop
