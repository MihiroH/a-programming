import { memo } from 'react'
import BaseText from '@/components/BaseText'
import styles from '@/styles/WorksTags.module.sass'

type Props = {
  className?: string
  tags: string[]
  selectedTags: string[]
  selectTag: (tag: string) => void
}

const WorksTags: React.VFC<Props> = memo(
  ({ className, tags, selectedTags, selectTag }) => {
    const [tagNameAll, ...tagsOtherThanAll] = tags

    return (
      <ul className={[styles.list, className].join(' ')}>
        <li
          className={[
            styles.item,
            !selectedTags.length ? styles['is-active'] : '',
          ].join(' ')}
          onClick={() => selectTag(tagNameAll)}
        >
          <BaseText sizeSp={24} sizePc={18}>
            #{tagNameAll}
          </BaseText>
        </li>
        {tagsOtherThanAll.map((tag, index) => (
          <li
            key={index}
            className={[
              styles.item,
              selectedTags.includes(tag) ? styles['is-active'] : '',
            ].join(' ')}
            onClick={() => selectTag(tag)}
          >
            <BaseText sizeSp={24} sizePc={18}>
              #{tag}
            </BaseText>
          </li>
        ))}
      </ul>
    )
  }
)

WorksTags.displayName = 'WorksTags'

export default WorksTags
