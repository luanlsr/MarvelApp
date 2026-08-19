export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar, Film, Star } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { cn } from '@/lib/utils'
import { TrackingActions } from '@/components/tracking-actions'
import { EpisodeWatchButton, SeasonWatchButton } from '@/components/episode-tracking'
import { streamingService } from '@/lib/streaming'
import { WhereToWatch } from '@/components/where-to-watch'
import { TrailerModal } from '@/components/trailer-modal'

interface TitlePageProps {
  params: Promise<{ id: string }>
}

export default async function TitlePage(props: TitlePageProps) {
  const params = await props.params;
  const session = await auth();
  if (!session?.user) {
    redirect('/login')
  }
  const user = session.user
  const userId = user.id!

  const title = await prisma.title.findUnique({
    where: { id: params.id },
    include: {
      characters: true,
      seasons: {
        include: {
          episodes: true
        }
      }
    }
  })

  if (!title) {
    notFound()
  }

  const availability = await streamingService.getAvailability(title.title, title.originalTitle || undefined)

  const userProgress = userId ? await prisma.userProgress.findMany({
    where: { userId, titleId: title.id }
  }) : []
  
  const watchedEpisodeIds = userProgress
    .filter(p => p.status === 'COMPLETED' && p.episodeId)
    .map(p => p.episodeId)
    
  const isTitleWatched = userProgress.some(p => p.status === 'COMPLETED' && !p.episodeId)
  const titleProgress = userProgress.find(p => !p.episodeId)

  // Fetch all user reviews for this title
  const allReviews = await prisma.userProgress.findMany({
    where: { titleId: title.id, rating: { not: null }, review: { not: null } },
    include: { user: true },
    orderBy: { updatedAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Back button */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10")}>
          <ChevronLeft className="w-6 h-6" />
        </Link>
      </div>

      {/* Hero Header */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <div className="absolute inset-0">
          {title.bannerUrl || title.posterUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={title.bannerUrl || title.posterUrl || ""} 
              alt={title.title} 
              className="w-full h-full object-cover opacity-50"
            />
          ) : (
            <div className="w-full h-full bg-zinc-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-end">
          {/* Poster */}
          <div className="hidden md:block w-48 lg:w-64 aspect-[2/3] rounded-lg overflow-hidden border-2 border-white/10 shadow-2xl shrink-0">
            {title.posterUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={title.posterUrl} alt={title.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">No Image</div>
            )}
          </div>
          
          {/* Info */}
          <div className="flex-grow space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="secondary" className="bg-red-600 hover:bg-red-700 text-white border-none">{title.type}</Badge>
              <Badge variant="outline" className="border-white/20 text-zinc-300">{title.phase}</Badge>
              <Badge variant="outline" className="border-white/20 text-zinc-300">Cronologia: #{title.timelineOrder}</Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">{title.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-zinc-400 items-center">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{title.year}</span>
              </div>
              {title.type === 'SERIES' ? (
                <>
                  {title.episodesCount && (
                    <div className="flex items-center gap-1">
                      <Film className="w-4 h-4" />
                      <span>{title.episodesCount} Episódios</span>
                    </div>
                  )}
                  {title.episodeDuration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>~{title.episodeDuration} min / ep</span>
                    </div>
                  )}
                  {title.duration && (
                    <div className="flex items-center gap-1 text-zinc-500 font-medium">
                      <span>(Tempo Total: {title.duration} min)</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {title.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{title.duration} min</span>
                    </div>
                  )}
                </>
              )}
              {title.director && (
                <div className="flex items-center gap-1">
                  <Film className="w-4 h-4" />
                  <span>{title.director}</span>
                </div>
              )}
              <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-white">{title.importance.replace('_', ' ')}</Badge>
            </div>

            <p className="text-lg text-zinc-300 max-w-3xl leading-relaxed mt-4">
              {title.synopsis}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <TrackingActions titleId={title.id} isWatched={isTitleWatched} currentRating={titleProgress?.rating} currentReview={titleProgress?.review} />
              <TrailerModal trailerUrl={title.trailerUrl} />
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <WhereToWatch availability={availability} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Seasons / Episodes if Series */}
        {title.type === 'SERIES' && title.seasons.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Temporadas</h2>
            <div className="space-y-12">
              {title.seasons.map((season) => {
                const seasonEpisodes = season.episodes
                const watchedCount = seasonEpisodes.filter(ep => watchedEpisodeIds.includes(ep.id)).length
                const isSeasonWatched = watchedCount === seasonEpisodes.length && seasonEpisodes.length > 0
                
                return (
                  <div key={season.id} className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-2">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl font-semibold">
                          Temporada {season.seasonNumber}
                        </h3>
                        <span className="text-sm text-zinc-400">
                          {watchedCount} / {seasonEpisodes.length} assistidos
                        </span>
                      </div>
                      <SeasonWatchButton seasonId={season.id} titleId={title.id} allWatched={isSeasonWatched} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {seasonEpisodes.map((episode) => {
                        const isEpWatched = watchedEpisodeIds.includes(episode.id)
                        return (
                          <div key={episode.id} className={`bg-zinc-900/50 rounded-lg p-4 border flex gap-4 transition-colors ${isEpWatched ? 'border-green-500/30 bg-green-500/5' : 'border-white/5'}`}>
                            <div className="w-24 h-16 bg-zinc-800 rounded shrink-0 overflow-hidden relative">
                              {episode.thumbnailUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={episode.thumbnailUrl} alt={episode.title} className="w-full h-full object-cover" />
                              )}
                            </div>
                            <div className="flex flex-col justify-between flex-grow">
                              <div>
                                <div className="text-xs text-zinc-500">Episódio {episode.episodeNumber}</div>
                                <div className="font-medium line-clamp-1">{episode.title}</div>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                {episode.duration ? <div className="text-xs text-zinc-500">{episode.duration} min</div> : <div />}
                                <EpisodeWatchButton episodeId={episode.id} titleId={title.id} isWatched={isEpWatched} />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Characters */}
        {title.characters.length > 0 && (
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold">Personagens</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {title.characters.map((char) => (
                <div key={char.id} className="flex flex-col items-center gap-2 w-24 shrink-0">
                  <div className="w-20 h-20 rounded-full bg-zinc-800 overflow-hidden border-2 border-white/10">
                    {char.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <span className="text-xs text-center font-medium line-clamp-2">{char.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Reviews */}
        {allReviews.length > 0 && (
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              Avaliações da Comunidade
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allReviews.map((review) => (
                <div key={review.id} className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {review.user?.image ? (
                        <img src={review.user.image} alt={review.user.name || 'Usuário'} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold">
                          {review.user?.name?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-zinc-200">{review.user?.name || 'Agente S.H.I.E.L.D.'}</div>
                        <div className="text-xs text-zinc-500">{new Date(review.updatedAt).toLocaleDateString('pt-BR')}</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < (review.rating || 0) ? 'fill-yellow-500 text-yellow-500' : 'text-zinc-700'}`} />
                      ))}
                    </div>
                  </div>
                  {review.review && (
                    <p className="text-zinc-300 italic text-sm border-l-2 border-white/10 pl-4 py-1">
                      &quot;{review.review}&quot;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
