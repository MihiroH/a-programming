import Image from 'next/image'
import { memo } from 'react'
import BaseText from '@/components/BaseText'
import styles from '@/styles/WorksProducts.module.sass'

type Product = {
  id: number
  name: string
  categories: string[]
  image_name: string
  url: string
}

type Props = {
  className?: string
  products: Product[]
}

const WorksProducts: React.VFC<Props> = memo(({ className, products }) => {
  return (
    <div className={[styles.wrapper, className].join(' ')}>
      <div className={styles.inner}>
        <ul className={styles.list}>
          {products.map((product, index) => (
            <li key={index} className={styles.item}>
              <a href={product.url} target="_blank" rel="noreferrer noopener">
                <div>
                  <Image
                    src={`/images/${product.image_name}`}
                    alt={product.name}
                    width={256}
                    height={144}
                  />
                </div>
                <div className={styles.item_label}>
                  <div className={styles.item_categories}>
                    {product.categories.map((cat, j) => (
                      <span key={j} className={styles.item_category}>
                        <BaseText sizeSp={20} sizePc={12}>
                          #{cat}
                        </BaseText>
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

WorksProducts.displayName = 'WorksProducts'

export default WorksProducts
