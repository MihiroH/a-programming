import styles from '@/styles/BaseText.module.sass'

type Props = {
  tagName?: keyof JSX.IntrinsicElements
  face?: 'normal' | 'ja' | 'en'
  weight?: 'r' | 'm' | 'b'
  className?: string
  sizeSp: number
  sizePc: number
  children: React.ReactNode
}

const BaseText: React.VFC<Props> = (props): JSX.Element => {
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
