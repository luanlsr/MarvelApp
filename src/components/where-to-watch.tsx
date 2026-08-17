'use client'

import { StreamingAvailability } from '@/lib/streaming'
import { buttonVariants } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

export function WhereToWatch({ availability }: { availability: StreamingAvailability | null }) {
  if (!availability || availability.providers.length === 0) {
    return (
      <div className="text-sm text-zinc-500 italic">
        Informações de streaming não disponíveis.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Onde Assistir Oficialmente</h3>
      <div className="flex flex-wrap gap-3">
        {availability.providers.map((p, idx) => (
          <a 
            key={idx} 
            href={p.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={cn(buttonVariants({ variant: "outline" }), "bg-blue-900/20 hover:bg-blue-900/40 border-blue-500/30 text-white")}
          >
            {p.provider.name}
            <ExternalLink className="w-3 h-3 ml-2" />
          </a>
        ))}
      </div>
    </div>
  )
}
