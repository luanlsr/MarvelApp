import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { Title } from '@prisma/client'
import Link from 'next/link'
import { ImageWithFallback } from './image-with-fallback'

interface TitleCardProps {
  title: Title
}

export function TitleCard({ title }: TitleCardProps) {
  return (
    <Link href={`/title/${title.id}`} className="block group h-full">
      <Card className="flex flex-col sm:flex-row h-full overflow-hidden bg-[#1A1D29]/60 backdrop-blur-xl border-white/5 hover:border-red-600/50 hover:bg-[#1A1D29] transition-all duration-500 shadow-xl group-hover:shadow-[0_0_40px_rgba(220,38,38,0.2)] group-hover:-translate-y-1 rounded-xl">
        
        {/* Poster Section */}
        <div className="sm:w-48 shrink-0 aspect-[2/3] sm:aspect-[3/4] relative overflow-hidden bg-zinc-900">
          <ImageWithFallback 
            src={title.posterUrl || ''} 
            alt={title.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-black/20 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-black/20 sm:to-[#040714] opacity-90 transition-opacity group-hover:opacity-100" />
          
          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end sm:hidden">
            <Badge variant="secondary" className="bg-black/80 text-white backdrop-blur-md border border-white/10 font-bold text-[10px] tracking-widest uppercase px-2 py-1">{title.phase}</Badge>
            <Badge variant="default" className="bg-red-600 text-white border-none shadow-lg px-2 py-1 font-bold text-xs">#{title.timelineOrder}</Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow p-6 sm:p-8 justify-between relative z-10">
          <div>
            <div className="hidden sm:flex justify-between items-start mb-4">
              <Badge variant="secondary" className="bg-white/10 text-zinc-200 hover:bg-white/20 border-none font-bold text-[10px] tracking-widest uppercase px-2 py-1 transition-colors">
                {title.phase}
              </Badge>
              <Badge variant="default" className="bg-red-600 hover:bg-red-500 text-white border-none shadow-lg shadow-red-900/30 px-2.5 py-1 font-bold text-xs transition-colors rounded-sm">
                #{title.timelineOrder}
              </Badge>
            </div>
            
            <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-3 group-hover:text-red-400 transition-colors duration-300 line-clamp-2 text-white">
              {title.title}
            </h3>
            
            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-400 mb-5">
              <span className="text-zinc-300">{title.year}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
              <span className="uppercase tracking-widest text-[10px] text-zinc-500">{title.type}</span>
              {title.duration && (
                <>
                  <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Clock className="w-3.5 h-3.5" />
                    {title.duration} min
                  </span>
                </>
              )}
            </div>
            
            <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed font-medium">
              {title.synopsis}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex justify-between items-center">
            <Badge variant="outline" className="border-white/20 text-zinc-400 text-[10px] uppercase tracking-widest bg-transparent">
              {title.importance.replace('_', ' ')}
            </Badge>
            
            <span className="text-sm font-bold text-red-500 flex items-center gap-1 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Ver Detalhes 
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
