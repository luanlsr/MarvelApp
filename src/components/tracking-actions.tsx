'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Star, MessageSquare, RotateCcw, Trash2 } from 'lucide-react'
import { deleteReview, markAsWatched, saveReview, unmarkAsWatched } from '@/app/actions/tracking'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface TrackingActionsProps {
  titleId: string
  isWatched?: boolean
  currentRating?: number | null
  currentReview?: string | null
}

export function TrackingActions({ titleId, isWatched = false, currentRating, currentReview }: TrackingActionsProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(currentRating || 0)
  const [review, setReview] = useState(currentReview || '')

  const handleWatch = async () => {
    setLoading(true)
    try { if (isWatched) await unmarkAsWatched(titleId); else await markAsWatched(titleId) }
    finally { setLoading(false) }
  }

  const handleReviewSubmit = async () => {
    setLoading(true)
    try { await saveReview(titleId, rating, review); setOpen(false) }
    finally { setLoading(false) }
  }

  const handleDeleteReview = async () => {
    setLoading(true)
    try { await deleteReview(titleId); setRating(0); setReview(''); setOpen(false) }
    finally { setLoading(false) }
  }

  return <div className="flex flex-wrap gap-3 items-center">
    <Button onClick={handleWatch} disabled={loading} variant={isWatched ? 'secondary' : 'default'} className={`cursor-pointer ${isWatched ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}>
      {isWatched ? <RotateCcw className="w-4 h-4 mr-2" /> : <Check className="w-4 h-4 mr-2" />}
      {isWatched ? 'Desmarcar assistido' : 'Marcar como assistido'}
    </Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" className="cursor-pointer border-white/20 text-white hover:bg-white/10" />}>
        <MessageSquare className="w-4 h-4 mr-2" />{currentReview ? 'Editar avaliação' : 'Avaliar'}
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 text-white border-white/10">
        <DialogHeader><DialogTitle>{currentReview ? 'Editar avaliação' : 'Avaliar filme'}</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2"><Label>Nota</Label><div className="flex gap-2">{[1,2,3,4,5].map((star) => <button type="button" key={star} onClick={() => setRating(star)} className="cursor-pointer focus:outline-none"><Star className={`w-6 h-6 ${rating >= star ? 'fill-yellow-500 text-yellow-500' : 'text-zinc-600'}`} /></button>)}</div></div>
          <div className="space-y-2"><Label>Comentário (opcional)</Label><Textarea value={review} onChange={(event) => setReview(event.target.value)} placeholder="O que você achou desse título?" className="bg-zinc-800 border-zinc-700 text-white" rows={4} /></div>
        </div>
        <DialogFooter>
          {currentReview && <Button variant="destructive" onClick={handleDeleteReview} disabled={loading} className="cursor-pointer"><Trash2 className="w-4 h-4 mr-2" />Excluir</Button>}
          <Button variant="ghost" onClick={() => setOpen(false)} className="cursor-pointer">Cancelar</Button>
          <Button onClick={handleReviewSubmit} disabled={loading} className="cursor-pointer">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
}
