'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

export async function markAsWatched(titleId: string, rating?: number, review?: string) {
  const session = await auth()
  const user = session?.user

  if (!user || !user.id) {
    throw new Error('Você precisa estar logado para salvar seu progresso.')
  }
  
  const userId = user.id

  const existing = await prisma.userProgress.findFirst({
    where: { userId, titleId, episodeId: null }
  })

  if (existing) {
    await prisma.userProgress.update({
      where: { id: existing.id },
      data: {
        status: 'COMPLETED',
        rating,
        review,
        watchedAt: new Date(),
      }
    })
  } else {
    await prisma.userProgress.create({
      data: {
        userId,
        titleId,
        status: 'COMPLETED',
        rating,
        review,
        watchedAt: new Date(),
      }
    })
  }

  revalidatePath(`/title/${titleId}`)
  revalidatePath(`/`)
}

export async function markEpisodeAsWatched(episodeId: string, titleId: string) {
  const session = await auth()
  const user = session?.user

  if (!user || !user.id) {
    throw new Error('Você precisa estar logado para salvar seu progresso.')
  }
  
  const userId = user.id

  const existing = await prisma.userProgress.findFirst({
    where: { userId, episodeId }
  })

  if (existing) {
    await prisma.userProgress.update({
      where: { id: existing.id },
      data: { status: 'COMPLETED', watchedAt: new Date() }
    })
  } else {
    await prisma.userProgress.create({
      data: {
        userId,
        episodeId,
        titleId,
        status: 'COMPLETED',
        watchedAt: new Date()
      }
    })
  }

  revalidatePath(`/title/${titleId}`)
  revalidatePath(`/`)
}

export async function markSeasonAsWatched(seasonId: string, titleId: string) {
  const session = await auth()
  const user = session?.user

  if (!user || !user.id) {
    throw new Error('Você precisa estar logado para salvar seu progresso.')
  }
  
  const userId = user.id

  const episodes = await prisma.episode.findMany({ where: { seasonId } })

  for (const ep of episodes) {
    const existing = await prisma.userProgress.findFirst({
      where: { userId, episodeId: ep.id }
    })
    
    if (existing) {
      await prisma.userProgress.update({
        where: { id: existing.id },
        data: { status: 'COMPLETED', watchedAt: new Date() }
      })
    } else {
      await prisma.userProgress.create({
        data: {
          userId,
          episodeId: ep.id,
          titleId,
          status: 'COMPLETED',
          watchedAt: new Date()
        }
      })
    }
  }

  revalidatePath(`/title/${titleId}`)
  revalidatePath(`/`)
}
