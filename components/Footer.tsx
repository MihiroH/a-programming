import Link from 'next/link'
import { useRouter } from 'next/router'
import BaseText from '@/components/BaseText'
import styles from '@/styles/Footer.module.sass'

const menuList = [
  {
    name: 'プライバシーポリシー',
    href: '/',
    external: false,
  },
  {
    name: '特定商取引法に基づく表記',
    href: '/',
    external: false,
  },
  {
    name: 'お問い合わせ',
    href: 'mailto:apro.yuto.engineer@gmail.com',
    external: true,
  },
]

type Props = {
  className?: string
}

const Footer: React.VFC<Props> = ({ className }) => {
  const router = useRouter()

  const goTo = ({ href = '', external = false } = {}) => {
    if (external) {
      window.open(href, '_blank')
      return
    }

    router.push(href)
  }

  const listEls = menuList.map((item, i) => (
    <li key={i} className={styles.item}>
      <span
        role="link"
        className={styles.anchor}
        onClick={() => goTo({ href: item.href, external: item.external })}
      >
        <BaseText sizeSp={20} sizePc={14}>
          {item.name}
        </BaseText>
      </span>
    </li>
  ))

  return (
    <footer className={[styles.footer, className].join(' ')}>
      <nav>
        <ul>{listEls}</ul>
      </nav>
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
