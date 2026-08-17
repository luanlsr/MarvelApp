'use server'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function getCatalog(filters?: {
  type?: string
  phase?: string
  search?: string
}) {
  const where: Prisma.TitleWhereInput = {}

  if (filters?.type) {
    where.type = filters.type
  }

  if (filters?.phase) {
    where.phase = filters.phase
  }

  if (filters?.search) {
    where.title = { contains: filters.search }
  }

  const titles = await prisma.title.findMany({
    where,
    orderBy: { timelineOrder: 'asc' },
  })

  return titles
}
