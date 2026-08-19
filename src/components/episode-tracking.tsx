'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, CheckCircle2, RotateCcw } from 'lucide-react'
import { markEpisodeAsWatched, markSeasonAsWatched, unmarkEpisodeAsWatched, unmarkSeasonAsWatched } from '@/app/actions/tracking'

export function EpisodeWatchButton({ episodeId, titleId, isWatched = false }: { episodeId: string, titleId: string, isWatched?: boolean }) {
  const [loading, setLoading] = useState(false)
  const handleWatch = async () => { setLoading(true); try { if (isWatched) await unmarkEpisodeAsWatched(episodeId, titleId); else await markEpisodeAsWatched(episodeId, titleId) } finally { setLoading(false) } }
  return <Button size="sm" variant={isWatched ? 'ghost' : 'outline'} onClick={handleWatch} disabled={loading} className={`cursor-pointer ${isWatched ? 'text-green-500 hover:text-green-400' : 'text-zinc-300 border-white/20 hover:bg-white/10'}`}>
    {isWatched ? <RotateCcw className="w-4 h-4 mr-2" /> : <Check className="w-4 h-4 mr-2" />}{isWatched ? 'Desmarcar' : 'Marcar'}
  </Button>
}

export function SeasonWatchButton({ seasonId, titleId, allWatched = false }: { seasonId: string, titleId: string, allWatched?: boolean }) {
  const [loading, setLoading] = useState(false)
  const handleWatchAll = async () => { setLoading(true); try { if (allWatched) await unmarkSeasonAsWatched(seasonId, titleId); else await markSeasonAsWatched(seasonId, titleId) } finally { setLoading(false) } }
  return <Button size="sm" variant="secondary" onClick={handleWatchAll} disabled={loading} className="cursor-pointer bg-white/10 hover:bg-white/20 text-white">
    {allWatched ? <RotateCcw className="w-4 h-4 mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}{allWatched ? 'Desmarcar temporada' : 'Marcar temporada completa'}
  </Button>
}
