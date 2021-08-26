import Link from 'next/link'
import BaseText from '@/components/BaseText'
import styles from '@/styles/Footer.module.sass'

const contentsArray = [
  {
    name: 'プライバシーポリシー',
    href: '/',
  },
  {
    name: '特定商取引法に基づく表記',
    href: '/',
  },
  {
    name: '返金ポリシー',
    href: '/',
  },
  {
    name: 'お問い合わせ',
    href: 'mailto:apro.yuto.engineer@gmail.com',
  },
  {
    name: '解約手続き',
    href: 'mailto:apro.yuto.engineer@gmail.com',
  },
]

const content = contentsArray.map((item, i) => (
  <li key={i} className={styles.item}>
    <Link href={item.href}>
      <a>
        <BaseText sizePc={14} sizeSp={20}>
          {item.name}
        </BaseText>
      </a>
    </Link>
  </li>
))

const Footer: React.VFC = () => {
  return (
    <footer className={styles.footer}>
      <ul>{content}</ul>
      <small className={styles.copyright}>
        &#x000A9; 2021 a-programming All Right Reserved.
      </small>
    </footer>
  )
}

export default Footer
