import Link from 'next/link'
import BaseText from '@/components/BaseText'
import styles from '@/styles/Footer.module.sass'

const menuList = [
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

const listEl = menuList.map((item, i) => (
  <li key={i} className={styles.item}>
    <Link href={item.href}>
      <a>
        <BaseText sizeSp={20} sizePc={14}>
          {item.name}
        </BaseText>
      </a>
    </Link>
  </li>
))

const Footer: React.VFC = () => {
  return (
    <footer className={styles.footer}>
      <ul>{listEl}</ul>
      <BaseText
        tagName="small"
        className={styles.copyright}
        sizeSp={20}
        sizePc={12}
      >
        &copy; 2021 a-programming All Right Reserved.
      </BaseText>
    </footer>
  )
}

export default Footer
