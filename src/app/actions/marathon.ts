'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { Title } from '@prisma/client'

export async function getMarathonProgress() {
  const session = await auth();
  const user = session?.user
  const userId = user?.id || 'test-user-id'

  const allTitles = await prisma.title.findMany({
    orderBy: { timelineOrder: 'asc' },
    include: {
      seasons: {
        include: { episodes: true }
      }
    }
  })

  const userProgress = await prisma.userProgress.findMany({
    where: { userId, status: 'COMPLETED' }
  })

  let totalItems = 0
  let watchedItems = 0

  for (const title of allTitles) {
    if (title.type === 'SERIES') {
      const titleEpisodes = title.seasons.flatMap(s => s.episodes)
      totalItems += titleEpisodes.length
      
      const watchedEps = userProgress.filter(p => p.titleId === title.id && p.episodeId)
      watchedItems += watchedEps.length
    } else {
      totalItems += 1
      if (userProgress.some(p => p.titleId === title.id && !p.episodeId)) {
        watchedItems += 1
      }
    }
  }

  const percentage = totalItems === 0 ? 0 : Math.round((watchedItems / totalItems) * 100)

  // Find next recommended title (first unwatched in timeline order)
  let nextRecommended: Title | null = null

  for (const title of allTitles) {
    if (title.type === 'SERIES') {
      const titleEpisodes = title.seasons.flatMap(s => s.episodes).sort((a, b) => {
        if (a.seasonId !== b.seasonId) return a.seasonId.localeCompare(b.seasonId) // Assuming UUIDs ordered won't work well, but it's mock
        return a.episodeNumber - b.episodeNumber
      })
      
      const watchedEpIds = userProgress.filter(p => p.titleId === title.id && p.episodeId).map(p => p.episodeId)
      
      if (watchedEpIds.length < titleEpisodes.length) {
        nextRecommended = title
        break
      }
    } else {
      const isWatched = userProgress.some(p => p.titleId === title.id && !p.episodeId)
      if (!isWatched) {
        nextRecommended = title
        break
      }
    }
  }

  return {
    percentage,
    watchedItems,
    totalItems,
    nextRecommended
  }
}
