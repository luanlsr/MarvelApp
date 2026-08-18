'use client'

import Link from 'next/link'
import { Film, Home, Users, BarChart, Calendar, Tv, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/filmes', icon: Film, label: 'Filmes' },
  { href: '/series', icon: Tv, label: 'Séries' },
  { href: '/personagens', icon: Users, label: 'Personagens' },
  { href: '/planejamento', icon: Calendar, label: 'Planejamento' },
  { href: '/estatisticas', icon: BarChart, label: 'Estatísticas' },
]

import { signOut } from 'next-auth/react'

export function Navbar({ user }: { user?: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300 overflow-hidden",
      scrolled || isOpen ? "bg-black/90 backdrop-blur-lg shadow-lg" : "bg-gradient-to-b from-black/80 via-black/40 to-transparent",
      isOpen ? "h-[100dvh]" : "h-20"
    )}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-[1400px]">
        <Link href="/" onClick={() => setIsOpen(false)} className="font-heading font-black text-2xl tracking-tighter text-white flex items-center gap-2 drop-shadow-lg z-50">
          <span className="bg-red-600 text-white px-2.5 py-0.5 rounded-sm leading-none text-xl">M</span>
          Tracker
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-300">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white hover:scale-105 transition-all flex items-center gap-2 drop-shadow-md">
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <span className="text-zinc-400">Olá, {user.name?.split(' ')[0]}</span>
              <button onClick={() => signOut({ redirectTo: '/' })} className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md font-bold transition-all hover:scale-105 drop-shadow-lg">
                Sair
              </button>
            </div>
          ) : (
            <Link href="/login" className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md font-bold transition-all hover:scale-105 drop-shadow-lg ml-4">
              Entrar
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center gap-4 z-50">
          {user ? (
            <button onClick={() => signOut({ redirectTo: '/' })} className="text-sm px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md font-bold transition-all">
              Sair
            </button>
          ) : (
            <Link href="/login" className="text-sm px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md font-bold transition-all">
              Entrar
            </Link>
          )}
          <button 
            className="text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden flex flex-col items-center justify-start pt-12 pb-24 gap-8 h-[calc(100dvh-5rem)] overflow-y-auto transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-4"
          >
            <item.icon className="w-8 h-8" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
