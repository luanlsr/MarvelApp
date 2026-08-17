import { prisma } from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { generateMarathonCalendar } from '@/app/actions/goals'
import { getMarathonProgress } from '@/app/actions/marathon'
import Link from 'next/link'
import { ChevronLeft, Plus, Target, CalendarDays, Clock } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export default async function PlanejamentoPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id || 'test-user-id'

  const goals = await prisma.goal.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
  const currentGoal = goals[0]

  const progress = await getMarathonProgress()
  const calendar = await generateMarathonCalendar()

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 max-w-5xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10")}>
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planejamento de Maratona</h1>
          <p className="text-zinc-400 mt-1">Defina metas e acompanhe seu ritmo de visualização.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              Progresso Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progress.percentage}%</div>
            <Progress value={progress.percentage} className="mt-4 h-2 bg-zinc-800 [&>div]:bg-blue-500" />
            <p className="text-xs text-zinc-500 mt-2">{progress.watchedItems} de {progress.totalItems} títulos assistidos</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-purple-500" />
              Títulos Restantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{calendar.remainingItems}</div>
            <p className="text-xs text-zinc-500 mt-2">Para completar a maratona atual</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-500" />
              Tempo Estimado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">~{calendar.remainingHours}h</div>
            <p className="text-xs text-zinc-500 mt-2">De conteúdo restante</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-white/10 pb-4">Suas Metas</h2>
        {currentGoal ? (
          <div className="bg-zinc-900 border border-white/10 rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">{currentGoal.title}</h3>
            <p className="text-zinc-400">{currentGoal.description}</p>
            {currentGoal.targetDate && (
              <p className="text-sm text-blue-400 mt-4 font-medium">
                Data Alvo: {currentGoal.targetDate.toLocaleDateString()}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-zinc-900/30 rounded-lg border border-dashed border-white/20">
            <p className="text-zinc-400 mb-4">Você ainda não definiu nenhuma meta de maratona.</p>
            <Button>Criar Nova Meta</Button>
          </div>
        )}
      </div>
    </div>
  )
}
