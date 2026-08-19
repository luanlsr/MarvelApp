'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { getMarathonProgress } from './marathon'

export async function createGoal(targetDate: Date, hoursPerWeek: number) {
  const session = await auth();
  const user = session?.user
  if (!user || !user.id) {
    throw new Error('Você precisa estar logado para criar um planejamento.')
  }
  const userId = user.id

  await prisma.goal.create({
    data: {
      userId,
      title: 'Maratona MCU',
      description: `Completar maratona até ${targetDate.toLocaleDateString()} assistindo ${hoursPerWeek} horas por semana.`,
      targetDate,
    }
  })

  revalidatePath('/planejamento')
}

export async function generateMarathonCalendar() {
  const progress = await getMarathonProgress()
  const remainingItems = progress.totalItems - progress.watchedItems
  // assuming average 2 hours per item for simplicity in this MVP
  const remainingHours = remainingItems * 2 

  return {
    remainingItems,
    remainingHours,
  }
}
