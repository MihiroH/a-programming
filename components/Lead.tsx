import { useContext } from 'react'
import BaseText from '@/components/BaseText'
import BaseTitle from '@/components/BaseTitle'
import { NicknameContext } from '@/contexts/index'
import styles from '@/styles/Lead.module.sass'

type Props = {
  className?: string
}

const Lead: React.VFC<Props> = ({ className }) => {
  const nickname = useContext(NicknameContext)

  return (
    <div className={className}>
      <BaseTitle
        level={2}
        weight="m"
        sizeSp={36}
        sizePc={36}
        className={styles.title}
      >
        プログラミングを日常に
      </BaseTitle>
      <div className={styles.textbox}>
        <BaseText
          tagName="p"
          face="ja"
          sizeSp={20}
          sizePc={18}
          className={styles.text}
        >
          何を作りたいですか？
          <br />
          将来どうなりたいですか？
          <br />
          プログラミングライフを楽しみたいですか？
          <br />
          WebサイトやWebアプリケーションを作りたいですか？
          <br />
          そんな{nickname}さんのためのスクールです！
          <br />
          ここではHTML・CSS・JavaScriptが学べます！！
        </BaseText>
        <BaseText
          tagName="p"
          face="ja"
          sizeSp={20}
          sizePc={18}
          className={styles.text}
        >
          <BaseText tagName="span" weight="b" sizeSp={20} sizePc={18}>
            HTML・CSS・JavaScriptって？
          </BaseText>
          <br />
          HTMLは文章をコンピュータに伝えるための言語です。
          <br />
          CSSは文章を装飾するための言語です。
          <br />
          JavaScriptは見た目や動作をよりリッチにするための言語です。
        </BaseText>
      </div>
    </div>
  )
}

export default Lead
