import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from '@/styles/BaseTextAnimation.module.sass'

type Props = {
  order?: number
  className?: string
  animate?: boolean
  children: React.ReactNode
}

const BaseTextAnimation: React.VFC<Props> = (props) => {
  const [children, setChildren] = useState(props.children)
  const timerId = useRef<NodeJS.Timer | null>()
  const opacityTimerId = useRef<NodeJS.Timer | null>()

  // Animate 500ms after the children is updated
  useEffect(() => {
    if (timerId.current) {
      clearTimeout(timerId.current)
    }

    timerId.current = setTimeout(() => {
      setChildren(props.children)
    }, 500)
  }, [props.children])

  const animate = props.animate ?? true
  const animatedRef = useCallback(
    (node) => {
      if (!node) {
        return
      }

      // Initialize animation
      node.style.opacity = 0
      node.animate([{ width: '0' }, { width: '0' }], {
        fill: 'both',
      })

      if (!animate) {
        return
      }

      let textLength = 0
      React.Children.forEach(children, (child) => {
        textLength += String(child).length
      })

      const order = props.order ?? 0
      const duration = textLength * 100
      const delay = order > 1 ? duration * (order - 1) : 0

      if (opacityTimerId.current) {
        clearTimeout(opacityTimerId.current)
      }

      setTimeout(() => {
        opacityTimerId.current = setTimeout(() => {
          node.style.opacity = 1
        }, delay)

        // text animation
        node.animate([{ width: 0 }, { width: `${node.scrollWidth}px` }], {
          duration,
          easing: `steps(${textLength}, end)`,
          delay,
          fill: 'both',
        })
      }, 500)
    },
    [animate, props.order, children]
  )

  return (
    <span
      ref={animatedRef}
      className={[styles.text, props.className].join(' ')}
    >
      {children}
    </span>
  )
}

export default BaseTextAnimation
