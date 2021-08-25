import Link from 'next/link'
import styles from '@/styles/Footer.module.sass'

const Footer: React.VFC = () => {
  return (
    <footer className={styles['footer']}>
      <ul>
        <li className={styles['item']}>
          <Link href="/">
            <a>プライバシーポリシー</a>
          </Link>
        </li>
        <li className={styles['item']}>
          <Link href="/">
            <a>特定商取引法に基づく表記</a>
          </Link>
        </li>
        <li className={styles['item']}>
          <Link href="/">
            <a>返金ポリシー</a>
          </Link>
        </li>
        <li className={styles['item']}>
          <Link href="/">
            <a>お問い合わせ</a>
          </Link>
        </li>
        <li className={styles['item']}>
          <Link href="/">
            <a>解約手続き</a>
          </Link>
        </li>
      </ul>
      <small className={styles['copyright']}>
        © 2021 a-programming All Right Reserved.
      </small>
    </footer>
  )
}

export default Footer
