import { prisma } from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ChevronLeft, BarChart3, Clock, Film, Award } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default async function EstatisticasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id || 'test-user-id'

  const userProgress = await prisma.userProgress.findMany({
    where: { userId, status: 'COMPLETED' },
    include: {
      title: true,
      episode: true
    }
  })

  let totalMinutes = 0
  const universeCounts: Record<string, number> = {}

  userProgress.forEach(p => {
    if (p.episode && p.episode.duration) {
      totalMinutes += p.episode.duration
    } else if (p.title && p.title.duration && !p.episodeId) {
      totalMinutes += p.title.duration
    }

    if (p.title && p.title.universe) {
      universeCounts[p.title.universe] = (universeCounts[p.title.universe] || 0) + 1
    }
  })

  const totalHours = Math.floor(totalMinutes / 60)
  
  // Find top universe
  let topUniverse = 'Nenhum'
  let maxCount = 0
  for (const [uni, count] of Object.entries(universeCounts)) {
    if (count > maxCount) {
      maxCount = count
      topUniverse = uni
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 max-w-5xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10")}>
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estatísticas</h1>
          <p className="text-zinc-400 mt-1">Seus dados da jornada Marvel.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              Tempo Assistido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalHours}h</div>
            <p className="text-xs text-zinc-500 mt-1">Total de {totalMinutes} minutos</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400 flex items-center gap-2">
              <Film className="w-4 h-4 text-blue-500" />
              Itens Finalizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userProgress.length}</div>
            <p className="text-xs text-zinc-500 mt-1">Filmes e episódios</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" />
              Universo Favorito
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold line-clamp-1">{topUniverse}</div>
            <p className="text-xs text-zinc-500 mt-1">{maxCount} itens assistidos</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-red-500" />
              Avaliação Média
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {userProgress.filter(p => p.rating).length > 0 
                ? (userProgress.filter(p => p.rating).reduce((acc, curr) => acc + (curr.rating || 0), 0) / userProgress.filter(p => p.rating).length).toFixed(1)
                : 'N/A'
              }
            </div>
            <p className="text-xs text-zinc-500 mt-1">Estrelas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
