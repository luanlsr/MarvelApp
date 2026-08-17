'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

export function TrailerModal({ trailerUrl }: { trailerUrl: string | null }) {
  const [open, setOpen] = useState(false)

  if (!trailerUrl) return null

  // extract video ID from YouTube URL if needed, or assume it's embed URL.
  // We'll assume the seed has embed URLs or standard URLs that we can just put in an iframe for MVP.
  // Very simplistic parsing for MVP:
  let embedUrl = trailerUrl
  if (trailerUrl.includes('watch?v=')) {
    embedUrl = trailerUrl.replace('watch?v=', 'embed/')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white" />}>
        <Play className="w-4 h-4 mr-2" />
        Ver Trailer
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl bg-black border-white/10 p-0 overflow-hidden">
        <div className="aspect-video w-full bg-zinc-900">
          {open && (
            <iframe 
              width="100%" 
              height="100%" 
              src={embedUrl} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
