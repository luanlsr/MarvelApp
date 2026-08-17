import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-4xl font-bold mb-4">Title Not Found</h2>
      <p className="text-zinc-400 mb-8 max-w-md">The movie or series you are looking for does not exist or has been removed.</p>
      <Link href="/" className={buttonVariants()}>
        Voltar para o Catálogo
      </Link>
    </div>
  )
}
