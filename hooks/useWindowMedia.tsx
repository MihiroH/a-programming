import { useState, useEffect } from 'react'

type Media = '' | 'mobile' | 'desctop'

export const useWindowMedia = (): Media => {
  const [windowMedia, setWindowMedia] = useState<Media>('')

  useEffect(() => {
    const handleResize = () => {
      setWindowMedia(
        window?.matchMedia('(max-width: 768px)')?.matches ? 'mobile' : 'desctop'
      )
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    handleResize()
    // Remove event listener on cleanup.
    return () => window.removeEventListener('resize', handleResize)
    // Empty array ensures that effect is only run on mount
  }, [])

  return windowMedia
}
