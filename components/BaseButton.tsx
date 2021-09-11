import type { Props as BaseProps } from '@/types/BaseButton'
import styles from '@/styles/BaseButton.module.sass'

type Props = BaseProps & {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const BaseButton: React.VFC<Props> = ({
  className,
  backgroundColor,
  borderColor,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      className={[
        styles.wrapper,
        styles[`background--${backgroundColor}`],
        styles[`border--${borderColor}`],
        className,
      ].join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default BaseButton
