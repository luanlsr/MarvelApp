export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function CharactersPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const characters = await prisma.character.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="min-h-screen bg-[#040714] text-white pt-24 pb-20">
      <main className="px-6 md:px-16 mx-auto max-w-[1600px]">
        <div className="mb-12 flex items-center gap-6">
          <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-md border border-white/10")}>
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <header className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl font-black tracking-tight mb-2 text-white drop-shadow-md">Personagens</h1>
            <p className="text-lg text-zinc-400 font-medium">Explore os heróis, vilões e entidades do Multiverso.</p>
          </header>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
          {characters.map(char => (
            <div key={char.id} className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-white/50 bg-zinc-900/40 cursor-pointer shadow-lg">
              <div className="aspect-[2/3] w-full relative">
                {char.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-xs text-center p-2 bg-zinc-800">Sem imagem</div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              </div>
              
              <div className="absolute bottom-0 w-full p-4 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                <h3 className="font-heading font-bold text-lg leading-tight text-white drop-shadow-md line-clamp-2">
                  {char.name}
                </h3>
                {char.description && (
                  <p className="text-xs text-zinc-300 mt-2 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {char.description}
                  </p>
                )}
              </div>
            </div>
          ))}
          {characters.length === 0 && (
            <div className="col-span-full text-center py-20 text-zinc-500 text-lg">
              Nenhum personagem cadastrado no multiverso ainda.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
