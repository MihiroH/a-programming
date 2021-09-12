import Link from 'next/link'
import { useState, useEffect } from 'react'
import BaseText from '@/components/BaseText'
import Arrowup from '@/public/images/icon_arrow_up.svg'
import styles from '@/styles/Pagetop.module.sass'

const Pagetop: React.VFC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isSp, setIsSp] = useState(false)

  const displayPosition = isSp ? 300 : 500

  useEffect(() => {
    setIsSp(window.matchMedia('(max-width: 768px)').matches)

    window.addEventListener('scroll', () => {
      setIsVisible(window.scrollY >= displayPosition)
    })
  }, [setIsSp, setIsVisible, displayPosition])

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
