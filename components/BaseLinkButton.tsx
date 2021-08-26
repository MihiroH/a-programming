import { forwardRef } from 'react'
import type { Props as BaseProps } from '@/types/BaseButton'
import styles from '@/styles/BaseButton.module.sass'

type Props = BaseProps & {
  href: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}
type Ref = HTMLAnchorElement

const BaseLinkButton = forwardRef<Ref, Props>(
  (
    { className, backgroundColor, borderColor, href, onClick, children },
    ref
  ) => {
    return (
      <a
        className={[
          styles.wrapper,
          styles[`background--${backgroundColor}`],
          styles[`border--${borderColor}`],
          className,
        ].join(' ')}
        href={href}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </a>
    )
  }
)

BaseLinkButton.displayName = 'BaseLinkButton'

export default BaseLinkButton
