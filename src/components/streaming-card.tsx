import { Title } from '@prisma/client'
import Link from 'next/link'
import { ImageWithFallback } from './image-with-fallback'

interface StreamingCardProps {
  title: Title
}

export function StreamingCard({ title }: StreamingCardProps) {
  return (
    <Link href={`/title/${title.id}`} className="group relative flex flex-col gap-3">
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-[#1A1D29] border border-white/5 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-white/20 group-hover:shadow-[0_0_25px_rgba(0,0,0,0.8)] group-hover:z-10 cursor-pointer ring-offset-[#040714] group-focus-visible:ring-2 group-focus-visible:ring-white">
        <ImageWithFallback 
          src={title.posterUrl || ''} 
          alt={title.title} 
          className="w-full h-full object-cover transition-opacity duration-300" 
          loading="lazy"
        />
        
        {/* Overlay that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
          <span className="font-heading font-bold text-white text-base md:text-lg leading-tight drop-shadow-md line-clamp-2">
            {title.title}
          </span>
          <div className="flex items-center gap-2 mt-1.5 text-[10px] md:text-[11px] font-semibold text-zinc-300">
            <span>{title.year}</span>
            <span className="w-1 h-1 rounded-full bg-red-600"></span>
            <span className="uppercase tracking-widest text-zinc-400">{title.phase}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
