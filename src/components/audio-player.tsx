'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Auto-play is often blocked by browsers until user interaction
  // We'll set the volume lower so it's pleasant background music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio 
        ref={audioRef} 
        src="/avengers-theme.mp3" 
        loop 
      />
      <button
        onClick={togglePlay}
        className={cn(
          "p-4 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white shadow-xl hover:scale-110 transition-all group",
          isPlaying ? "animate-pulse" : ""
        )}
        title={isPlaying ? "Pausar música épica" : "Tocar música épica"}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-red-500 group-hover:text-red-400" />
        ) : (
          <VolumeX className="w-6 h-6 text-zinc-400 group-hover:text-white" />
        )}
      </button>
    </div>
  )
}
