import type { Props as BaseProps } from '@/types/BaseText'
import styles from '@/styles/BaseText.module.sass'

type Props = BaseProps & { tagName?: keyof JSX.IntrinsicElements }

const BaseText: React.VFC<Props> = (props) => {
  const Tag = props.tagName
    ? props.tagName
    : ('span' as keyof JSX.IntrinsicElements)

  const face = props.face ? props.face : 'normal'
  const weight = props.weight ? props.weight : 'r'

  return (
    <Tag
      className={[
        styles[`face--${face}`],
        styles[`weight--${weight}`],
        styles[`sp_size--${props.sizeSp}`],
        styles[`pc_size--${props.sizePc}`],
        props.className,
      ].join(' ')}
    >
      {props.children}
    </Tag>
  )
}

export default BaseText
