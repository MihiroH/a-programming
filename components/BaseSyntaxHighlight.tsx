import type { Props as BaseProps } from '@/types/BaseText'
import BaseText from '@/components/BaseText'

type Props = BaseProps & {
  color: 'gray' | 'green' | 'blue' | 'red' | 'white' | 'yellow' | 'purple'
}

const BaseSyntaxHighlight: React.VFC<Props> = ({
  color,
  children,
  ...props
}) => {
  return (
    <BaseText className={color} {...props}>
      {children}
    </BaseText>
  )
}

export default BaseSyntaxHighlight
