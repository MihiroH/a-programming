import Image from 'next/image'
import BaseText from '@/components/BaseText'
import BaseTitle from '@/components/BaseTitle'
import ImageMihiro from '@/public/images/img_mihiro.png'
import ImageYuto from '@/public/images/img_yuto.png'
import styles from '@/styles/Message.module.sass'

type Props = {
  className?: string
}

const Message: React.VFC<Props> = ({ className }) => {
  const strongPoints = [
    '大丈夫です。',
    '現役エンジニア',
    '2対1体制',
    '完全オンライン型',
    '太郎さんのペースで進める',
  ]

  const strongPointsEls = strongPoints.reduce((all: JSX.Element[], text) => {
    const element = () => {
      return (
        <BaseText tagName="span" weight="b" sizeSp={20} sizePc={18}>
          {text}
        </BaseText>
      )
    }
    all.push(element())
    return all
  }, [])

  return (
    <section className={[styles.wrapper, className].join(' ')}>
      <BaseTitle
        level="2"
        weight="m"
        sizeSp={36}
        sizePc={36}
        className={styles.title}
      >
        本当にできるようになるの？
      </BaseTitle>
      <BaseText tagName="p" sizeSp={20} sizePc={18} className={styles.text}>
        始めてみたけど結局何をしたら良いかわからない。。。
        <br />
        このまま独学していても稼げないのでは。。。
        <br />
        {strongPointsEls[0]}
        <br />
        本サイトを制作した僕たち{strongPointsEls[1]}が太郎さんをサポートします。
        <br />
        {strongPointsEls[2]}かつ{strongPointsEls[3]}なので、
        <br className="sp" />
        {strongPointsEls[4]}ことができます。
        <br />
        最終的には技術だけではなく、自分で考える力を身につけ
        <br />
        「欲しい」を実現できるよう導きます。
        <br />
        未来を信じて一歩踏み出してみてください！！
      </BaseText>

      <div className={styles['img--mihiro']}>
        <Image src={ImageMihiro} alt="みひろ" />
      </div>
      <div className={styles['img--yuto']}>
        <Image src={ImageYuto} alt="ゆうと" />
      </div>
    </section>
  )
}

export default Message
