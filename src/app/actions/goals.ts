'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { getMarathonProgress } from './marathon'

export async function createGoal(targetDate: Date, hoursPerWeek: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id || 'test-user-id'

  if (!user) {
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, email: 'test@example.com' }
    })
  }

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
