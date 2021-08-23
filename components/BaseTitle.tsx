import BaseText from '@/components/BaseText'

type Props = {
  face?: 'normal' | 'ja' | 'en'
  weight?: 'r' | 'm' | 'b'
  className?: string
  level: '1' | '2' | '3' | '4' | '5' | '6'
  sizeSp: number
  sizePc: number
  children: React.ReactNode
}

const BaseTitle: React.VFC<Props> = ({
  level,
  children,
  ...props
}): JSX.Element => {
  return (
    <BaseText tagName={`h${level}`} {...props}>
      {children}
    </BaseText>
  )
}

export default BaseTitle
