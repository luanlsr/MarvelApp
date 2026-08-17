import { prisma } from '@/lib/prisma'
import { TitleCard } from './title-card'

export async function TimelineGrid() {
  const titles = await prisma.title.findMany({
    orderBy: { timelineOrder: 'asc' },
  })

  return (
    <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12 pb-12">
      {titles.map((title, index) => (
        <div key={title.id} className="relative pl-8 md:pl-12">
          {/* Timeline dot */}
          <div className="absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full bg-red-600 ring-4 ring-black" />
          
          <div className="md:w-[500px]">
            <TitleCard title={title} />
          </div>
        </div>
      ))}
    </div>
  )
}
