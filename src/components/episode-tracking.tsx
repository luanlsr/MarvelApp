'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, CheckCircle2 } from 'lucide-react'
import { markEpisodeAsWatched, markSeasonAsWatched } from '@/app/actions/tracking'

export function EpisodeWatchButton({ episodeId, titleId, isWatched = false }: { episodeId: string, titleId: string, isWatched?: boolean }) {
  const [loading, setLoading] = useState(false)

  const handleWatch = async () => {
    setLoading(true)
    await markEpisodeAsWatched(episodeId, titleId)
    setLoading(false)
  }

  return (
    <Button 
      size="sm"
      variant={isWatched ? "ghost" : "outline"}
      onClick={handleWatch}
      disabled={loading || isWatched}
      className={isWatched ? "text-green-500 hover:text-green-400" : "text-zinc-300 border-white/20 hover:bg-white/10"}
    >
      {isWatched ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Check className="w-4 h-4 mr-2" />}
      {isWatched ? 'Assistido' : 'Marcar'}
    </Button>
  )
}

export function SeasonWatchButton({ seasonId, titleId, allWatched = false }: { seasonId: string, titleId: string, allWatched?: boolean }) {
  const [loading, setLoading] = useState(false)

  const handleWatchAll = async () => {
    setLoading(true)
    await markSeasonAsWatched(seasonId, titleId)
    setLoading(false)
  }

  if (allWatched) {
    return (
      <div className="flex items-center text-green-500 text-sm font-medium">
        <CheckCircle2 className="w-4 h-4 mr-2" />
        Temporada Completa
      </div>
    )
  }

  return (
    <Button 
      size="sm"
      variant="secondary"
      onClick={handleWatchAll}
      disabled={loading}
      className="bg-white/10 hover:bg-white/20 text-white"
    >
      <Check className="w-4 h-4 mr-2" />
      Marcar Temporada Completa
    </Button>
  )
}
