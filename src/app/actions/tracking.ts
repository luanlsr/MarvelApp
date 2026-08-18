'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

export async function markAsWatched(titleId: string, rating?: number, review?: string) {
  const session = await auth()
  const user = session?.user

  // Fallback to a mock user ID if not logged in (for testing purposes during development)
  const userId = user?.id || 'test-user-id'

  // Ensure user exists in prisma (or create mock)
  if (!user) {
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, email: 'test@example.com' }
    })
  }

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
  const userId = user?.id || 'test-user-id'

  if (!user) {
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, email: 'test@example.com' }
    })
  }

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
  const userId = user?.id || 'test-user-id'

  if (!user) {
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, email: 'test@example.com' }
    })
  }

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

