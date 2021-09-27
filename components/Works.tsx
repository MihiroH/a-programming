import Image from 'next/image'
import { useState, useCallback } from 'react'
import BaseText from '@/components/BaseText'
import BaseTitle from '@/components/BaseTitle'
import WorksProducts from '@/components/WorksProducts'
import WorksTags from '@/components/WorksTags'
import ImageBannerPc from '@/public/images/img_languages.png'
import ImageBannerSp from '@/public/images/sp/img_languages.png'
import styles from '@/styles/Works.module.sass'

type Props = {
  className?: string
}

const tagNameAll = 'すべて'
const tags = [
  tagNameAll,
  'Webサイト',
  'Webアプリケーション',
  'HTML・CSS',
  'JavaScript',
  'WordPress',
  'React',
  'Vue.js',
]
const initialSelectedTags: string[] = []
const products = [
  {
    id: 0,
    name: 'Todo',
    categories: ['Webアプリケーション', 'Vue.js'],
    image_name: 'img_thumb_todo.png',
    url: 'https://test.shungry.jp/currents/todos',
  },
  {
    id: 1,
    name: 'Todo2',
    categories: ['Webアプリケーション', 'Vue.js'],
    image_name: 'img_thumb_todo_2.png',
    url: 'https://test.shungry.jp/currents/todos',
  },
  {
    id: 2,
    name: '放課後等デイサービス',
    categories: ['Webサイト', 'WordPress'],
    image_name: 'img_thumb_smile.png',
    url: 'https://threey-smile.com/',
  },
  {
    id: 3,
    name: '放課後等デイサービス2',
    categories: ['Webサイト', 'WordPress'],
    image_name: 'img_thumb_smile_2.png',
    url: 'https://threey-smile.com/',
  },
  {
    id: 4,
    name: 'donrichy',
    categories: ['Webサイト', 'HTML・CSS'],
    image_name: 'img_thumb_donrichy.png',
    url: 'https://donrichy.jp/',
  },
  {
    id: 5,
    name: 'donrichy2',
    categories: ['Webサイト', 'HTML・CSS'],
    image_name: 'img_thumb_donrichy_2.png',
    url: 'https://donrichy.jp/',
  },
  {
    id: 6,
    name: '放課後等デイサービス2',
    categories: ['Webサイト', 'WordPress'],
    image_name: 'img_thumb_smile_2.png',
    url: 'https://threey-smile.com/',
  },
  {
    id: 7,
    name: 'donrichy',
    categories: ['Webサイト', 'HTML・CSS'],
    image_name: 'img_thumb_donrichy.png',
    url: 'https://donrichy.jp/',
  },
]

const Works: React.VFC<Props> = ({ className }) => {
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags)

  const selectTag = useCallback(
    (tag: string) => {
      if (tag === tagNameAll) {
        setSelectedTags(initialSelectedTags)
        return
      }

      const index = selectedTags.findIndex((selecteTag) => {
        return selecteTag === tag
      })

      if (index > -1) {
        const newSelectedTags = [...selectedTags]
        newSelectedTags.splice(index, 1)
        setSelectedTags(newSelectedTags)
        return
      }

      setSelectedTags([...selectedTags, tag])
    },
    [selectedTags]
  )

  const visibleProducts = () => {
    if (!selectedTags.length) {
      return products
    }

    return products.filter((product) => {
      return product.categories.some((cat) => selectedTags.includes(cat))
    })
  }

  return (
    <section className={[styles.wrapper, className].join(' ')}>
      <div className={styles.banner}>
        <div className="sp">
          <Image
            src={ImageBannerSp}
            alt="学習可能な言語(HTML,CSS,JavaScript,Vue.js,React)"
            className="sp"
          />
        </div>
        <div className="pc">
          <Image
            src={ImageBannerPc}
            alt="学習可能な言語(HTML,CSS,JavaScript,Vue.js,React)"
            className="pc"
          />
        </div>
      </div>
      <BaseTitle
        level={2}
        weight="m"
        sizeSp={36}
        sizePc={36}
        className={styles.title}
      >
        何ができるようになるの？
      </BaseTitle>
      <BaseText
        tagName="p"
        face="ja"
        sizeSp={20}
        sizePc={18}
        className={styles.lead}
      >
        このスクールでは
        <BaseText face="ja" weight="b" sizeSp={20} sizePc={18}>
          Webサイト(HP)
        </BaseText>
        や
        <BaseText face="ja" weight="b" sizeSp={20} sizePc={18}>
          Webアプリケーション
        </BaseText>
        を作成できるようになります。
      </BaseText>

      <div className={styles.search}>
        <WorksTags
          tags={tags}
          selectedTags={selectedTags}
          selectTag={selectTag}
          className={styles.tags}
        />
        <WorksProducts
          products={visibleProducts()}
          className={styles.products}
        />
      </div>
    </section>
  )
}

export default Works
