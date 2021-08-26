import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from '@/styles/Pagetop.module.sass'

const Pagetop: React.VFC = () => {
  const [isDisplay, setIsDisplay] = useState(false)
  const [isSp, setIsSp] = useState(false)

  const displayPosition: number = isSp ? 300 : 500

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setIsSp(true)
    } else {
      setIsSp(false)
    }
    window.addEventListener('scroll', () => {
      if (window.scrollY >= displayPosition) {
        setIsDisplay(true)
      } else {
        setIsDisplay(false)
      }
    })
  }, [setIsSp, setIsDisplay, displayPosition])

  return (
    <Link href="/">
      <a
        style={{
          transition: 'opacity 1s',
          opacity: isDisplay ? 1 : 0,
          visibility: isDisplay ? 'visible' : 'hidden',
        }}
        className={styles.pageTop}
      >
        <div className={styles.icon}>
          <Image
            src="/images/icn_pagetop.svg"
            alt="PageTop"
            width={34}
            height={19}
          />
        </div>
        <span className={styles.text}>ページトップ</span>
      </a>
    </Link>
  )
}

export default Pagetop
