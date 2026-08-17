'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Star, MessageSquare } from 'lucide-react'
import { markAsWatched } from '@/app/actions/tracking'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface TrackingActionsProps {
  titleId: string
  isWatched?: boolean
}

export function TrackingActions({ titleId, isWatched = false }: TrackingActionsProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const handleMarkWatched = async () => {
    setLoading(true)
    await markAsWatched(titleId)
    setLoading(false)
  }

  const handleReviewSubmit = async () => {
    setLoading(true)
    await markAsWatched(titleId, rating, review)
    setLoading(false)
    setOpen(false)
  }

  return (
    <div className="flex gap-4 items-center">
      <Button 
        onClick={handleMarkWatched} 
        disabled={loading || isWatched}
        variant={isWatched ? "secondary" : "default"}
        className={isWatched ? "bg-green-600 hover:bg-green-700 text-white" : ""}
      >
        <Check className="w-4 h-4 mr-2" />
        {isWatched ? 'Assistido' : 'Marcar como Assistido'}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="outline" className="border-white/20 text-white hover:bg-white/10" />}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Avaliar
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 text-white border-white/10">
          <DialogHeader>
            <DialogTitle>Avaliar Filme</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nota</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star className={`w-6 h-6 ${rating >= star ? 'fill-yellow-500 text-yellow-500' : 'text-zinc-600'}`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Resenha (opcional)</Label>
              <Textarea 
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="O que você achou desse título?"
                className="bg-zinc-800 border-zinc-700 text-white"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleReviewSubmit} disabled={loading}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
