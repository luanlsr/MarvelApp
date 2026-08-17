import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Start seeding...')

  // Upsert a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
    },
  })

  const ironMan = await prisma.title.create({
    data: {
      title: 'Iron Man',
      originalTitle: 'Iron Man',
      type: 'MOVIE',
      year: 2008,
      universe: 'MCU',
      phase: 'FASE 1',
      timelineOrder: 1,
      importance: 'ESSENCIAL',
      duration: 126,
      synopsis: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
    },
  })

  const incredibleHulk = await prisma.title.create({
    data: {
      title: 'The Incredible Hulk',
      originalTitle: 'The Incredible Hulk',
      type: 'MOVIE',
      year: 2008,
      universe: 'MCU',
      phase: 'FASE 1',
      timelineOrder: 2,
      importance: 'MUITO_IMPORTANTE',
      duration: 112,
      synopsis: 'Bruce Banner, a genetics researcher with a tragic past, suffers an accident that causes him to transform into a raging green monster when he gets angry.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/gKzYx79y0AQTL4UAk1cSQPi3aIN.jpg',
    },
  })
  
  const ironMan2 = await prisma.title.create({
    data: {
      title: 'Iron Man 2',
      originalTitle: 'Iron Man 2',
      type: 'MOVIE',
      year: 2010,
      universe: 'MCU',
      phase: 'FASE 1',
      timelineOrder: 3,
      importance: 'RECOMENDADO',
      duration: 124,
      synopsis: 'With the world now aware of his dual life as the armored superhero Iron Man, billionaire inventor Tony Stark faces pressure from the government, the press, and the public to share his technology with the military.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg',
    },
  })

  const thor = await prisma.title.create({
    data: {
      title: 'Thor',
      originalTitle: 'Thor',
      type: 'MOVIE',
      year: 2011,
      universe: 'MCU',
      phase: 'FASE 1',
      timelineOrder: 4,
      importance: 'MUITO_IMPORTANTE',
      duration: 115,
      synopsis: 'The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth), where he soon becomes one of their finest defenders.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/prSfAi1xGrhLQNxVSUFh61xLS4f.jpg',
    },
  })

  const captainAmerica = await prisma.title.create({
    data: {
      title: 'Captain America: The First Avenger',
      originalTitle: 'Captain America: The First Avenger',
      type: 'MOVIE',
      year: 2011,
      universe: 'MCU',
      phase: 'FASE 1',
      timelineOrder: 5,
      importance: 'ESSENCIAL',
      duration: 124,
      synopsis: 'Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a "Super-Soldier serum". But being Captain America comes at a price as he attempts to take down a war monger and a terrorist organization.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V8s0BNle07kIzL.jpg',
    },
  })

  const avengers = await prisma.title.create({
    data: {
      title: 'The Avengers',
      originalTitle: 'The Avengers',
      type: 'MOVIE',
      year: 2012,
      universe: 'MCU',
      phase: 'FASE 1',
      timelineOrder: 6,
      importance: 'ESSENCIAL',
      duration: 143,
      synopsis: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xrm17A0.jpg',
    },
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
