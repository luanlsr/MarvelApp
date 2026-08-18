'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await signIn('google', { redirectTo: '/' })
  }

  return (
    <div className="flex-grow flex items-center justify-center min-h-[calc(100vh-80px)] bg-black relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=2142&auto=format&fit=crop" // Marvel/Iron Man aesthetic placeholder
          alt="Marvel Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-[#040714]/80 to-transparent" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl text-center">
        <div className="mb-8">
          <h1 className="font-heading font-black text-4xl text-white mb-2 tracking-tight drop-shadow-md">
            Bem-vindo à <br/><span className="text-red-600">INICIATIVA VINGADORES</span>
          </h1>
          <p className="text-zinc-400">
            Acesse o banco de dados do MCU para rastrear seu progresso e classificar títulos.
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 hover:scale-[1.02] transition-all"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Autenticar com Google
        </button>
        
        <p className="mt-6 text-xs text-zinc-500">
          Nível de Acesso: Nível 7 (Autorização da S.H.I.E.L.D. necessária)
        </p>
      </div>
    </div>
  )
}
