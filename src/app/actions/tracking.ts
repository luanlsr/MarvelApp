'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

async function requireUser() {
  const session = await auth()
  const user = session?.user
  if (!user?.id) throw new Error('Voce precisa estar logado para salvar seu progresso.')
  return user.id
}

function refreshTitle(titleId: string) {
  revalidatePath(`/title/${titleId}`)
  revalidatePath('/')
}

export async function markAsWatched(titleId: string) {
  const userId = await requireUser()
  const existing = await prisma.userProgress.findFirst({ where: { userId, titleId, episodeId: null } })
  if (existing) await prisma.userProgress.update({ where: { id: existing.id }, data: { status: 'COMPLETED', watchedAt: new Date() } })
  else await prisma.userProgress.create({ data: { userId, titleId, status: 'COMPLETED', watchedAt: new Date() } })
  refreshTitle(titleId)
}

export async function unmarkAsWatched(titleId: string) {
  const userId = await requireUser()
  const existing = await prisma.userProgress.findFirst({ where: { userId, titleId, episodeId: null } })
  if (existing) await prisma.userProgress.update({ where: { id: existing.id }, data: { status: 'UNWATCHED', watchedAt: null } })
  refreshTitle(titleId)
}

export async function saveReview(titleId: string, rating: number, review: string) {
  const userId = await requireUser()
  const existing = await prisma.userProgress.findFirst({ where: { userId, titleId, episodeId: null } })
  const data = { rating: rating || null, review: review.trim() || null }
  if (existing) await prisma.userProgress.update({ where: { id: existing.id }, data })
  else await prisma.userProgress.create({ data: { userId, titleId, status: 'UNWATCHED', ...data } })
  revalidatePath(`/title/${titleId}`)
}

export async function deleteReview(titleId: string) {
  const userId = await requireUser()
  const existing = await prisma.userProgress.findFirst({ where: { userId, titleId, episodeId: null } })
  if (existing) await prisma.userProgress.update({ where: { id: existing.id }, data: { rating: null, review: null } })
  revalidatePath(`/title/${titleId}`)
}

export async function markEpisodeAsWatched(episodeId: string, titleId: string) {
  const userId = await requireUser()
  const existing = await prisma.userProgress.findFirst({ where: { userId, episodeId } })
  if (existing) await prisma.userProgress.update({ where: { id: existing.id }, data: { status: 'COMPLETED', watchedAt: new Date() } })
  else await prisma.userProgress.create({ data: { userId, episodeId, titleId, status: 'COMPLETED', watchedAt: new Date() } })
  refreshTitle(titleId)
}

export async function unmarkEpisodeAsWatched(episodeId: string, titleId: string) {
  const userId = await requireUser()
  const existing = await prisma.userProgress.findFirst({ where: { userId, episodeId } })
  if (existing) await prisma.userProgress.update({ where: { id: existing.id }, data: { status: 'UNWATCHED', watchedAt: null } })
  refreshTitle(titleId)
}

export async function markSeasonAsWatched(seasonId: string, titleId: string) {
  const userId = await requireUser()
  const episodes = await prisma.episode.findMany({ where: { seasonId } })
  for (const episode of episodes) {
    const existing = await prisma.userProgress.findFirst({ where: { userId, episodeId: episode.id } })
    if (existing) await prisma.userProgress.update({ where: { id: existing.id }, data: { status: 'COMPLETED', watchedAt: new Date() } })
    else await prisma.userProgress.create({ data: { userId, episodeId: episode.id, titleId, status: 'COMPLETED', watchedAt: new Date() } })
  }
  refreshTitle(titleId)
}

export async function unmarkSeasonAsWatched(seasonId: string, titleId: string) {
  const userId = await requireUser()
  const episodes = await prisma.episode.findMany({ where: { seasonId }, select: { id: true } })
  await prisma.userProgress.updateMany({ where: { userId, episodeId: { in: episodes.map((episode) => episode.id) } }, data: { status: 'UNWATCHED', watchedAt: null } })
  refreshTitle(titleId)
}
