import BaseLinkButton from '@/components/BaseLinkButton'
import BaseText from '@/components/BaseText'
import BaseTitle from '@/components/BaseTitle'
import styles from '@/styles/Price.module.sass'

type Props = {
  className?: string
}

const priceList = [
  {
    id: 0,
    recommended: false,
    catch_copy: 'とりあえず学ぶ！',
    text: '技術をピックアップして<br />学習したい方向け',
    period: '1ヶ月',
    price: '50,000',
  },
  {
    id: 1,
    recommended: true,
    catch_copy: '短期間でガッツリ！',
    text: 'スピード重視で<br />技術を身に付けたい方向け',
    period: '3ヶ月',
    price: '100,000',
  },
  {
    id: 2,
    recommended: false,
    catch_copy: '中期間で丁寧に！',
    text: '基礎から応用まで<br />丁寧に学習したい方向け',
    period: '6ヶ月',
    price: '200,000',
  },
  {
    id: 3,
    recommended: false,
    catch_copy: '一通り網羅！',
    text: '中規模の開発も<br />学習したい方向け',
    period: '12ヶ月',
    price: '400,000',
  },
]

const Price: React.VFC<Props> = ({ className }) => {
  return (
    <section className={[styles.wrapper, className].join(' ')}>
      <BaseTitle
        level={2}
        weight="m"
        sizeSp={36}
        sizePc={36}
        className={styles.title}
      >
        料金プラン
      </BaseTitle>

      <ul className={styles.list}>
        {priceList.map((item) => (
          <li key={item.id} className={styles.item}>
            {item.recommended && (
              <BaseText
                weight="b"
                sizeSp={18}
                sizePc={10}
                className={styles.item_recommended}
              >
                オススメ
              </BaseText>
            )}
            <div className={styles.item_head}>
              <BaseText
                tagName="p"
                face="ja"
                weight="b"
                sizeSp={22}
                sizePc={14}
              >
                {item.catch_copy}
              </BaseText>
            </div>
            <div className={styles.item_body}>
              <BaseText
                tagName="p"
                face="ja"
                sizeSp={20}
                sizePc={12}
                className={styles.item_text}
              >
                <span dangerouslySetInnerHTML={{ __html: item.text }} />
              </BaseText>
              <BaseText
                sizeSp={26}
                face="ja"
                sizePc={20}
                className={styles.item_period}
              >
                {item.period}
              </BaseText>
              <div className={styles.item_price}>
                <BaseText
                  face="ja"
                  weight="b"
                  sizeSp={45}
                  sizePc={30}
                  className={styles.item_price_num}
                >
                  {item.price}
                </BaseText>
                <BaseText
                  sizeSp={30}
                  sizePc={20}
                  className={styles.item_price_unit}
                >
                  円
                </BaseText>
              </div>
              <BaseLinkButton
                href="//example.com"
                backgroundColor="blue"
                className={styles.item_btn}
              >
                <BaseText sizeSp={20} sizePc={14} weight="b">
                  お申し込み
                </BaseText>
              </BaseLinkButton>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.contact}>
        <BaseTitle
          level={3}
          face="ja"
          sizeSp={26}
          sizePc={24}
          className={styles.contact_title}
        >
          〜 無料相談 〜
        </BaseTitle>
        <BaseText
          tagName="p"
          face="ja"
          sizeSp={20}
          sizePc={18}
          className={styles.contact_text}
        >
          どれを選んだら良いかわからない方も
          <br />
          そうでない方も、無料相談が可能です！
          <br />
          是非お問い合わせください！！
          <BaseText
            face="ja"
            sizeSp={18}
            sizePc={12}
            className={styles.contact_attention}
          >
            ※混雑している場合、受付できない場合がございます。
            <br className="sp" />
            お早めにお申し込みいただけますと幸いです。
          </BaseText>
        </BaseText>
        <BaseLinkButton
          href="//example.com"
          backgroundColor="blue"
          className={styles.contact_btn}
        >
          <BaseText sizeSp={20} sizePc={20} weight="b">
            無料相談
          </BaseText>
        </BaseLinkButton>
      </div>
    </section>
  )
}

export default Price
