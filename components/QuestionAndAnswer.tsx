import { useState } from 'react'
import BaseText from '@/components/BaseText'
import BaseTitle from '@/components/BaseTitle'
import styles from '@/styles/QuestionAndAnswer.module.sass'

type Props = {
  className?: string
}

const QuestionAndAnswer: React.VFC<Props> = ({ className }) => {
  const list = [
    {
      question: {
        title: '料金は？',
      },
      answer: {
        title: '学習期間によって異なります。',
        desc: `
          <a href="#price">詳細はこちら</a>をご確認ください。
          <br />
          消費税を含む価格で表示しています。
        `,
      },
    },
    {
      question: {
        title: '何が学べる？',
      },
      answer: {
        title: 'HTML・CSS・JavaScriptを学べます。',
        desc: `
          これらを使用してWebサイトやWebアプリケーションなどを制作できます。
          <br />
          特にJavaScriptを使えるようになるとiOSアプリやAndroidアプリを制作することも可能です。つまり最強です(笑)。
          <br />
          しかも学習コストは他の言語に比べて比較的低めと言われています。
          <br />
          太郎さん、プログラミングの世界へようこそ！！
        `,
      },
    },
    {
      question: {
        title: '学習期間はどれくらい？',
      },
      answer: {
        title: '最低1ヶ月からお選びいただけます。',
        desc: '1ヶ月〜12ヶ月の中からお選びいただけます。',
        children: [
          {
            title: '＜1ヶ月コース＞',
            desc: `
              HTML・CSS・JavaScriptの基本的な構文、Git操作などのプログラミングに必要な最低限の知識を習得できます。特定の技術(React等)のみを学習したい方にもオススメです。
            `,
          },
          {
            title: '＜3ヶ月コース＞',
            desc: `
              基本的な構文やGit操作、その他の便利ツールの習得はもちろん、プログラミング脳を身につけてもらうことを目標としています。
              <br />
              ここでいうプログラミング脳とは、設計力です。
              <br />
              ゴールは何か、そのためには何ができていて、何ができていないか。
              <br />
              設計力が身につけば、1人でもどんどん成長できます。
            `,
          },
          {
            title: '＜6ヶ月コース＞',
            desc: `
              中期的に技術を習得します。ReactやVue.js、NuxtやNextを習得してWebアプリケーションを制作し、Web上に公開します。丁寧に着実に習得したい方にオススメです。
            `,
          },
          {
            title: '＜12ヶ月コース＞',
            desc: `
              10〜20ページあるWebサイトや、WebAPIをゴリゴリ使用するWebアプリケーションの開発も制作できるようになります。長期的にサポートして欲しい方や本スクールが大好きな方にオススメです。
            `,
          },
        ],
      },
    },
    {
      question: {
        title: '学習方法は？',
      },
      answer: {
        title: '太郎さんにあった学習方法で進めます。',
        desc: `
          ・基礎をしっかり固めてから応用に入りたい方
          <br />
          ・基礎はさっとやってしまって、実際に制作を進めながら理解を深めたい方
          <br />
          ・特定の技術をピックアップして学習したい方
          <br />
          ・広く浅く学習したい方
          <br />
          ・チーム開発をしてみたい方
          <br />
          など様々な方法や進め方があると思います。太郎さんにあった方法で進めます。
          <br />
          ぜひ一度<a href="https://example.com">お問い合わせ</a>ください。
        `,
      },
    },
    {
      question: {
        title: '学習場所は？',
      },
      answer: {
        title: '原則オンラインです。',
        desc: `
          原則オンラインで進めさせていただきます。
          <br />
          どうしても対面が良い方は<a href="https//example.com">お問い合わせ</a>ください。
        `,
      },
    },
    {
      question: {
        title: 'PCのレンタルは？',
      },
      answer: {
        title: 'ありません。',
        desc: `
          PCのレンタルサービスは行っておりません。申し訳ありません。
          <br />
          オススメのPCは下記をご参照ください。
          <br />
          〜省略〜
        `,
      },
    },
  ]

  const [visibleList, setVisibleList] = useState<number[]>([])

  const toggleDisplay = (index: number) => {
    if (visibleList.includes(index)) {
      setVisibleList(visibleList.filter((i) => i !== index))
      return
    }

    setVisibleList((old) => [...old, index])
  }

  return (
    <div className={[styles.wrapper, className].join(' ')}>
      <BaseTitle
        level={2}
        face="ja"
        weight="m"
        sizeSp={36}
        sizePc={36}
        className={styles.title}
      >
        Q＆A
      </BaseTitle>
      <ul className={styles.list}>
        {list.map((item, index) => (
          <li key={index} className={styles.item}>
            <div
              role="button"
              aria-label={item.question.title}
              tabIndex={0}
              className={[
                styles.item_btn,
                visibleList.includes(index) ? `${styles['is-active']}` : '',
              ].join(' ')}
              onClick={() => toggleDisplay(index)}
            ></div>
            <BaseTitle level={3} face="ja" weight="b" sizeSp={20} sizePc={16}>
              Q. {item.question.title}
            </BaseTitle>
            <div
              className={[
                styles.item_answer,
                visibleList.includes(index) ? `${styles['is-active']}` : '',
              ].join(' ')}
            >
              <BaseTitle level={3} face="ja" weight="b" sizeSp={20} sizePc={16}>
                A. {item.answer.title}
              </BaseTitle>
              <div className={styles.item_desc}>
                <BaseText tagName="p" face="ja" sizeSp={20} sizePc={16}>
                  <span
                    dangerouslySetInnerHTML={{ __html: item.answer.desc }}
                  />
                </BaseText>
                <ul>
                  {item.answer.children &&
                    item.answer.children.map((child, j) => (
                      <li key={j}>
                        <BaseTitle
                          level={4}
                          face="ja"
                          weight="b"
                          sizeSp={20}
                          sizePc={16}
                        >
                          {child.title}
                        </BaseTitle>
                        <BaseText tagName="p" face="ja" sizeSp={20} sizePc={16}>
                          <span
                            dangerouslySetInnerHTML={{ __html: child.desc }}
                          />
                        </BaseText>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuestionAndAnswer
