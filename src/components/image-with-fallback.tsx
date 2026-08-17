'use client'

import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string
}

export function ImageWithFallback({ fallbackText = 'Sem Capa', alt, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  if (error || !props.src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-zinc-900 text-zinc-600 ${props.className || ''}`}>
        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
        <span className="text-xs font-semibold uppercase tracking-wider">{fallbackText}</span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt || fallbackText}
      onError={() => setError(true)}
    />
  )
}
