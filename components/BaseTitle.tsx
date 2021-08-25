import type { Props as BaseProps } from '@/types/BaseText'
import BaseText from '@/components/BaseText'

type Props = BaseProps & {
  level: '1' | '2' | '3' | '4' | '5' | '6'
}

const BaseTitle: React.VFC<Props> = ({ level, children, ...props }) => {
  return (
    <BaseText tagName={`h${level}`} {...props}>
      {children}
    </BaseText>
  )
}

export default BaseTitle
