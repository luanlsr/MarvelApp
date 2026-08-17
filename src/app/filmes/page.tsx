export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma'
import { StreamingCard } from '@/components/streaming-card'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Calendar, Clock } from 'lucide-react'

export default async function FilmesPage({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const resolvedParams = await searchParams
  const sort = resolvedParams?.sort === 'release' ? 'release' : 'timeline'

  const titles = await prisma.title.findMany({
    where: { 
      type: { in: ['MOVIE', 'SPECIAL', 'SHORT'] } 
    },
    orderBy: sort === 'release' ? { year: 'asc' } : { timelineOrder: 'asc' },
  })

  // Group titles by phase (if timeline) or decade (if release)
  let grouped: Record<string, typeof titles> = {}
  
  if (sort === 'release') {
    grouped = titles.reduce((acc, title) => {
      const decade = Math.floor(title.year / 10) * 10
      const key = `Década de ${decade}`
      if (!acc[key]) acc[key] = []
      acc[key].push(title)
      return acc
    }, {} as Record<string, typeof titles>)
  } else {
    grouped = titles.reduce((acc, title) => {
      const phase = title.phase || 'Outros'
      if (!acc[phase]) acc[phase] = []
      acc[phase].push(title)
      return acc
    }, {} as Record<string, typeof titles>)
  }

  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    if (sort === 'release') return a.localeCompare(b) // Decades sort naturally
    if (a.includes('FASE') && b.includes('FASE')) return a.localeCompare(b)
    return 0
  })

  return (
    <div className="min-h-screen bg-[#040714] text-white pt-24 pb-20">
      <main className="px-6 md:px-16 mx-auto max-w-[1600px]">
        <header className="mb-12 max-w-2xl">
          <h1 className="font-heading text-4xl md:text-5xl font-black tracking-tight mb-4 text-white drop-shadow-md">Catálogo de Filmes</h1>
          <p className="text-lg text-zinc-400 font-medium mb-6">
            Explore os filmes, curtas e especiais do MCU.
          </p>
          
          <div className="flex bg-zinc-900/50 p-1 rounded-lg w-fit border border-white/5">
            <Link 
              href="/filmes?sort=timeline"
              className={cn("flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all", sort === 'timeline' ? "bg-white/10 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5")}
            >
              <Clock className="w-4 h-4" />
              Ordem Cronológica
            </Link>
            <Link 
              href="/filmes?sort=release"
              className={cn("flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all", sort === 'release' ? "bg-white/10 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5")}
            >
              <Calendar className="w-4 h-4" />
              Ordem de Lançamento
            </Link>
          </div>
        </header>

        <div className="space-y-16">
          {sortedKeys.map((key) => (
            <section key={key} className="relative">
              <h2 className="font-heading text-xl md:text-2xl font-bold tracking-tight mb-6 text-white drop-shadow-sm flex items-center gap-3">
                {key}
                <div className="h-px flex-grow bg-white/5" />
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {grouped[key].map((title) => (
                  <StreamingCard key={title.id} title={title} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
