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

  return (
    <Link href="/">
      <a
        className={[
          styles['wrapper'],
          isVisible ? styles['is-visible'] : '',
        ].join(' ')}
      >
        <div className={styles.icon}>
          <Arrowup />
        </div>
        <BaseText className={styles.text} sizeSp={21} sizePc={10}>
          ページトップ
        </BaseText>
      </a>
    </Link>
  )
}

export default Pagetop
