'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type EditableRevealProps = {
  children: ReactNode
  index?: number
  className?: string
}

export function EditableReveal({ children, index = 0, className = '' }: EditableRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${mounted ? 'editable-reveal' : ''} ${visible ? 'is-visible' : ''} ${className}`}
      style={mounted ? { transitionDelay: `${Math.min(index, 10) * 80}ms` } : undefined}
    >
      {children}
    </div>
  )
}
