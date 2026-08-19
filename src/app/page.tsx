import { TimelineGrid } from '@/components/timeline-grid'
import { getMarathonProgress } from '@/app/actions/marathon'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Play, Info, CheckCircle } from 'lucide-react'
import { ImageWithFallback } from '@/components/image-with-fallback'
import { cn } from '@/lib/utils'

export default async function Home() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const { nextRecommended } = await getMarathonProgress()
  
  // Use nextRecommended as the main hero if available, otherwise a default fallback
  const heroTitle = nextRecommended ? nextRecommended.title : "Universo Marvel"
  const heroSynopsis = nextRecommended 
    ? nextRecommended.synopsis 
    : "Acompanhe o Universo Cinematográfico da Marvel na ordem perfeita. Marque o que já assistiu e prepare-se para as próximas fases."
  const heroImage = nextRecommended?.bannerUrl || nextRecommended?.posterUrl || "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg" // Default Avengers backdrop

  return (
    <div className="flex-1 pb-20">
      {/* Streaming Hero Banner */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex flex-col justify-end px-6 md:px-16 pb-24 md:pb-32">
        {/* Background Image with Vignette/Gradient */}
        <div className="absolute inset-0 -z-20">
          <ImageWithFallback 
            src={heroImage} 
            alt={heroTitle} 
            className="w-full h-full object-cover object-top" 
          />
        </div>
        
        {/* Gradients to blend with background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-[#040714]/60 to-transparent -z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040714] via-[#040714]/40 to-transparent -z-10" />
        
        <div className="max-w-3xl space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-2 backdrop-blur-sm shadow-[0_0_20px_rgba(220,38,38,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Contagem Regressiva: Doomsday (17 Dez 2026)
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-2xl">
            {heroTitle}
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl font-medium leading-relaxed drop-shadow-md line-clamp-3">
            {heroSynopsis}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link 
              href={nextRecommended ? `/title/${nextRecommended.id}` : "/planejamento"}
              className={cn(
                buttonVariants({ size: "lg" }), 
                "bg-white text-black hover:bg-zinc-200 rounded-[4px] px-8 font-bold text-base h-14 w-full sm:w-auto shadow-xl transition-transform hover:scale-105"
              )}
            >
              <Play className="w-6 h-6 mr-3 fill-current" />
              {nextRecommended ? "Assistir" : "Iniciar Jornada"}
            </Link>
            
            {nextRecommended ? (
              <Link 
                href={`/actions/marathon/mark?id=${nextRecommended.id}`}
                className={cn(
                  buttonVariants({ size: "lg" }), 
                  "bg-zinc-800/80 hover:bg-zinc-700/80 text-white rounded-[4px] px-8 font-bold text-base h-14 w-full sm:w-auto backdrop-blur-md transition-all"
                )}
              >
                <CheckCircle className="w-5 h-5 mr-3" />
                Marcar como Visto
              </Link>
            ) : (
              <Link 
                href="/estatisticas"
                className={cn(
                  buttonVariants({ size: "lg" }), 
                  "bg-zinc-800/80 hover:bg-zinc-700/80 text-white rounded-[4px] px-8 font-bold text-base h-14 w-full sm:w-auto backdrop-blur-md transition-all"
                )}
              >
                <Info className="w-5 h-5 mr-3" />
                Mais Informações
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Sections (Streaming Rows style) */}
      <main className="px-6 md:px-16 -mt-10 relative z-20 space-y-20 max-w-[1600px] mx-auto">
        
        <section>
          <div className="mb-6 flex items-center gap-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
              A Linha do Tempo <span className="text-red-600">Oficial</span>
            </h2>
            <div className="h-px flex-grow bg-white/5 hidden md:block" />
          </div>
          
          <TimelineGrid />
        </section>

      </main>
    </div>
  )
}
