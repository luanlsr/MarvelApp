import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const mcuTitles = [
  // FASE 1
  { title: 'Iron Man', originalTitle: 'Iron Man', type: 'MOVIE', year: 2008, universe: 'MCU', phase: 'FASE 1', timelineOrder: 1, importance: 'ESSENCIAL', posterUrl: 'https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg' },
  { title: 'The Incredible Hulk', originalTitle: 'The Incredible Hulk', type: 'MOVIE', year: 2008, universe: 'MCU', phase: 'FASE 1', timelineOrder: 2, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTUyNzk3MjA1OF5BMl5BanBnXkFtZTcwMTE1Njg2MQ@@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Iron Man 2', originalTitle: 'Iron Man 2', type: 'MOVIE', year: 2010, universe: 'MCU', phase: 'FASE 1', timelineOrder: 3, importance: 'RECOMENDADO', posterUrl: 'https://image.tmdb.org/t/p/w500/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg' },
  { title: 'Thor', originalTitle: 'Thor', type: 'MOVIE', year: 2011, universe: 'MCU', phase: 'FASE 1', timelineOrder: 4, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNjRhNGZjZjEtYTQzYS00OWUxLThjNGEtMTIwMTE2ZDFlZTZkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Captain America: The First Avenger', originalTitle: 'Captain America: The First Avenger', type: 'MOVIE', year: 2011, universe: 'MCU', phase: 'FASE 1', timelineOrder: 5, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNzUyM2YyY2MtNzNlMS00MWU5LTgxNjAtNzZlNmI2NjU2NDZlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'The Avengers', originalTitle: 'The Avengers', type: 'MOVIE', year: 2012, universe: 'MCU', phase: 'FASE 1', timelineOrder: 6, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },

  // FASE 2
  { title: 'Iron Man 3', originalTitle: 'Iron Man 3', type: 'MOVIE', year: 2013, universe: 'MCU', phase: 'FASE 2', timelineOrder: 7, importance: 'RECOMENDADO', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjIzMzAzMjQyM15BMl5BanBnXkFtZTcwNzM2NjcyOQ@@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Thor: The Dark World', originalTitle: 'Thor: The Dark World', type: 'MOVIE', year: 2013, universe: 'MCU', phase: 'FASE 2', timelineOrder: 8, importance: 'COMPLEMENTAR', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTQyNzAwOTUxOF5BMl5BanBnXkFtZTcwMTE0OTc5OQ@@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Captain America: The Winter Soldier', originalTitle: 'Captain America: The Winter Soldier', type: 'MOVIE', year: 2014, universe: 'MCU', phase: 'FASE 2', timelineOrder: 9, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNWY1NjFmNDItZDhmOC00NjI1LWE0ZDItMTM0MjBjZThiOTQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Guardians of the Galaxy', originalTitle: 'Guardians of the Galaxy', type: 'MOVIE', year: 2014, universe: 'MCU', phase: 'FASE 2', timelineOrder: 10, importance: 'ESSENCIAL', posterUrl: 'https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg' },
  { title: 'Avengers: Age of Ultron', originalTitle: 'Avengers: Age of Ultron', type: 'MOVIE', year: 2015, universe: 'MCU', phase: 'FASE 2', timelineOrder: 11, importance: 'ESSENCIAL', posterUrl: 'https://image.tmdb.org/t/p/w500/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg' },
  { title: 'Ant-Man', originalTitle: 'Ant-Man', type: 'MOVIE', year: 2015, universe: 'MCU', phase: 'FASE 2', timelineOrder: 12, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjM2NTQ5Mzc2M15BMl5BanBnXkFtZTgwNTcxMDI2NTE@._V1_FMjpg_UX1000_.jpg' },

  // FASE 3
  { title: 'Captain America: Civil War', originalTitle: 'Captain America: Civil War', type: 'MOVIE', year: 2016, universe: 'MCU', phase: 'FASE 3', timelineOrder: 13, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Doctor Strange', originalTitle: 'Doctor Strange', type: 'MOVIE', year: 2016, universe: 'MCU', phase: 'FASE 3', timelineOrder: 14, importance: 'ESSENCIAL', posterUrl: 'https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg' },
  { title: 'Guardians of the Galaxy Vol. 2', originalTitle: 'Guardians of the Galaxy Vol. 2', type: 'MOVIE', year: 2017, universe: 'MCU', phase: 'FASE 3', timelineOrder: 15, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Spider-Man: Homecoming', originalTitle: 'Spider-Man: Homecoming', type: 'MOVIE', year: 2017, universe: 'MCU', phase: 'FASE 3', timelineOrder: 16, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://image.tmdb.org/t/p/w500/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg' },
  { title: 'Thor: Ragnarok', originalTitle: 'Thor: Ragnarok', type: 'MOVIE', year: 2017, universe: 'MCU', phase: 'FASE 3', timelineOrder: 17, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Black Panther', originalTitle: 'Black Panther', type: 'MOVIE', year: 2018, universe: 'MCU', phase: 'FASE 3', timelineOrder: 18, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg' },
  { title: 'Avengers: Infinity War', originalTitle: 'Avengers: Infinity War', type: 'MOVIE', year: 2018, universe: 'MCU', phase: 'FASE 3', timelineOrder: 19, importance: 'ESSENCIAL', posterUrl: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg' },
  { title: 'Ant-Man and the Wasp', originalTitle: 'Ant-Man and the Wasp', type: 'MOVIE', year: 2018, universe: 'MCU', phase: 'FASE 3', timelineOrder: 20, importance: 'RECOMENDADO', posterUrl: 'https://image.tmdb.org/t/p/w500/rv1AWImgx386ULjcf62VYaW8zSt.jpg' },
  { title: 'Captain Marvel', originalTitle: 'Captain Marvel', type: 'MOVIE', year: 2019, universe: 'MCU', phase: 'FASE 3', timelineOrder: 21, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg' },
  { title: 'Avengers: Endgame', originalTitle: 'Avengers: Endgame', type: 'MOVIE', year: 2019, universe: 'MCU', phase: 'FASE 3', timelineOrder: 22, importance: 'ESSENCIAL', posterUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg' },
  { title: 'Spider-Man: Far From Home', originalTitle: 'Spider-Man: Far From Home', type: 'MOVIE', year: 2019, universe: 'MCU', phase: 'FASE 3', timelineOrder: 23, importance: 'RECOMENDADO', posterUrl: 'https://image.tmdb.org/t/p/w500/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg' },

  // FASE 4 (Movies and Series)
  { title: 'WandaVision', originalTitle: 'WandaVision', type: 'SERIES', year: 2021, universe: 'MCU', phase: 'FASE 4', timelineOrder: 24, importance: 'ESSENCIAL', posterUrl: 'https://image.tmdb.org/t/p/w500/glKDfE6btIRcVB5zrjspRIs4r52.jpg' },
  { title: 'The Falcon and the Winter Soldier', originalTitle: 'The Falcon and the Winter Soldier', type: 'SERIES', year: 2021, universe: 'MCU', phase: 'FASE 4', timelineOrder: 25, importance: 'RECOMENDADO', posterUrl: 'https://image.tmdb.org/t/p/w500/6kbAMLteGO8yyewYau6bJ683sw7.jpg' },
  { title: 'Loki', originalTitle: 'Loki', type: 'SERIES', year: 2021, universe: 'MCU', phase: 'FASE 4', timelineOrder: 26, importance: 'ESSENCIAL', posterUrl: 'https://static.tvmaze.com/uploads/images/original_untouched/478/1195717.jpg' },
  { title: 'Black Widow', originalTitle: 'Black Widow', type: 'MOVIE', year: 2021, universe: 'MCU', phase: 'FASE 4', timelineOrder: 27, importance: 'COMPLEMENTAR', posterUrl: 'https://m.media-amazon.com/images/M/MV5BZTMyZTA0ZTItYjY3Yi00ODNjLWExYTgtYzgxZTk0NTg0Y2FlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'What If...?', originalTitle: 'What If...?', type: 'SERIES', year: 2021, universe: 'MCU', phase: 'FASE 4', timelineOrder: 28, importance: 'COMPLEMENTAR', posterUrl: 'https://static.tvmaze.com/uploads/images/original_untouched/543/1358372.jpg' },
  { title: 'Shang-Chi and the Legend of the Ten Rings', originalTitle: 'Shang-Chi and the Legend of the Ten Rings', type: 'MOVIE', year: 2021, universe: 'MCU', phase: 'FASE 4', timelineOrder: 29, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BZmY5MDcyNzAtYzg3MC00MGNlLTg3OGItNmRjYThkZGVlNzAyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Eternals', originalTitle: 'Eternals', type: 'MOVIE', year: 2021, universe: 'MCU', phase: 'FASE 4', timelineOrder: 30, importance: 'COMPLEMENTAR', posterUrl: 'https://m.media-amazon.com/images/M/MV5BZTBiZjI2M2UtZTNiNy00NmU4LWJiMjYtZjk4MDIzMzhlMjFlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Hawkeye', originalTitle: 'Hawkeye', type: 'SERIES', year: 2021, universe: 'MCU', phase: 'FASE 4', timelineOrder: 31, importance: 'RECOMENDADO', posterUrl: 'https://static.tvmaze.com/uploads/images/original_untouched/383/959105.jpg' },
  { title: 'Spider-Man: No Way Home', originalTitle: 'Spider-Man: No Way Home', type: 'MOVIE', year: 2021, universe: 'MCU', phase: 'FASE 4', timelineOrder: 32, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Moon Knight', originalTitle: 'Moon Knight', type: 'SERIES', year: 2022, universe: 'MCU', phase: 'FASE 4', timelineOrder: 33, importance: 'COMPLEMENTAR', posterUrl: 'https://static.tvmaze.com/uploads/images/original_untouched/407/1019370.jpg' },
  { title: 'Doctor Strange in the Multiverse of Madness', originalTitle: 'Doctor Strange in the Multiverse of Madness', type: 'MOVIE', year: 2022, universe: 'MCU', phase: 'FASE 4', timelineOrder: 34, importance: 'ESSENCIAL', posterUrl: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg' },
  { title: 'Ms. Marvel', originalTitle: 'Ms. Marvel', type: 'SERIES', year: 2022, universe: 'MCU', phase: 'FASE 4', timelineOrder: 35, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://static.tvmaze.com/uploads/images/original_untouched/405/1013952.jpg' },
  { title: 'Thor: Love and Thunder', originalTitle: 'Thor: Love and Thunder', type: 'MOVIE', year: 2022, universe: 'MCU', phase: 'FASE 4', timelineOrder: 36, importance: 'RECOMENDADO', posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjRiMDhiZjQtNjk5Yi00ZDcwLTkyYTEtMDc1NjdmNjFhNGIzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'She-Hulk: Attorney at Law', originalTitle: 'She-Hulk: Attorney at Law', type: 'SERIES', year: 2022, universe: 'MCU', phase: 'FASE 4', timelineOrder: 37, importance: 'RECOMENDADO', posterUrl: 'https://static.tvmaze.com/uploads/images/original_untouched/486/1215646.jpg' },
  { title: 'Werewolf by Night', originalTitle: 'Werewolf by Night', type: 'SPECIAL', year: 2022, universe: 'MCU', phase: 'FASE 4', timelineOrder: 38, importance: 'OPCIONAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BODUzMGFkYzgtYzhjNC00ZmFjLTg3ZTYtYWJkMWRjMzJmYTQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Black Panther: Wakanda Forever', originalTitle: 'Black Panther: Wakanda Forever', type: 'MOVIE', year: 2022, universe: 'MCU', phase: 'FASE 4', timelineOrder: 39, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BYWY5NDY1ZjItZDQxMy00MTAzLTgyOGQtNTQxYjFiMzZjMjUyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'The Guardians of the Galaxy Holiday Special', originalTitle: 'The Guardians of the Galaxy Holiday Special', type: 'SPECIAL', year: 2022, universe: 'MCU', phase: 'FASE 4', timelineOrder: 40, importance: 'OPCIONAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BZDA3MzdlYTQtMTUxNi00ZjJmLTkyOTYtNDkzYmIzYTJkZjMzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },

  // FASE 5
  { title: 'Ant-Man and the Wasp: Quantumania', originalTitle: 'Ant-Man and the Wasp: Quantumania', type: 'MOVIE', year: 2023, universe: 'MCU', phase: 'FASE 5', timelineOrder: 41, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMThkYWY5ZjQtYjJlMS00MDFmLWFkYzEtODEzZjg5YWFmMGY4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Guardians of the Galaxy Vol. 3', originalTitle: 'Guardians of the Galaxy Vol. 3', type: 'MOVIE', year: 2023, universe: 'MCU', phase: 'FASE 5', timelineOrder: 42, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg' },
  { title: 'Secret Invasion', originalTitle: 'Secret Invasion', type: 'SERIES', year: 2023, universe: 'MCU', phase: 'FASE 5', timelineOrder: 43, importance: 'RECOMENDADO', posterUrl: 'https://static.tvmaze.com/uploads/images/original_untouched/465/1163819.jpg' },
  { title: 'Loki Season 2', originalTitle: 'Loki Season 2', type: 'SERIES', year: 2023, universe: 'MCU', phase: 'FASE 5', timelineOrder: 44, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BZTg0ZWU4MzItYjEwOC00ZjcwLTlhZDktNDQwNWNjOWE1Y2VmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'The Marvels', originalTitle: 'The Marvels', type: 'MOVIE', year: 2023, universe: 'MCU', phase: 'FASE 5', timelineOrder: 45, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BYzczOWM4MzItMWMyOS00ZDczLWIxMzctNzBmYTgzOTI1MzI3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Echo', originalTitle: 'Echo', type: 'SERIES', year: 2024, universe: 'MCU', phase: 'FASE 5', timelineOrder: 46, importance: 'COMPLEMENTAR', posterUrl: 'https://static.tvmaze.com/uploads/images/original_untouched/499/1247624.jpg' },
  { title: 'Deadpool & Wolverine', originalTitle: 'Deadpool & Wolverine', type: 'MOVIE', year: 2024, universe: 'MCU', phase: 'FASE 5', timelineOrder: 47, importance: 'ESSENCIAL', posterUrl: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg' },
  { title: 'Agatha All Along', originalTitle: 'Agatha All Along', type: 'SERIES', year: 2024, universe: 'MCU', phase: 'FASE 5', timelineOrder: 48, importance: 'RECOMENDADO', posterUrl: 'https://static.tvmaze.com/uploads/images/original_untouched/536/1340567.jpg' },

  // FASE 6 (Upcoming)
  { title: 'Captain America: Brave New World', originalTitle: 'Captain America: Brave New World', type: 'MOVIE', year: 2025, universe: 'MCU', phase: 'FASE 6', timelineOrder: 49, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDRjY2E0ZmEtN2QwNi00NTEwLWI3MWItODNkMGYwYWFjNGE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Thunderbolts*', originalTitle: 'Thunderbolts*', type: 'MOVIE', year: 2025, universe: 'MCU', phase: 'FASE 6', timelineOrder: 50, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDIzNGUwZmYtODM0Yy00NjA3LTgxOGUtOTY0ZGM5MjBkM2I3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'The Fantastic Four: First Steps', originalTitle: 'The Fantastic Four: First Steps', type: 'MOVIE', year: 2025, universe: 'MCU', phase: 'FASE 6', timelineOrder: 51, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BOGM5MzA3MDAtYmEwMi00ZDNiLTg4MDgtMTZjOTc0ZGMyNTIwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Avengers: Doomsday', originalTitle: 'Avengers: Doomsday', type: 'MOVIE', year: 2026, universe: 'MCU', phase: 'FASE 6', timelineOrder: 52, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGEwYWZkN2UtOTQ5Mi00MGQzLWEzNjYtMWMyNDBkMTkzMWNkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Avengers: Secret Wars', originalTitle: 'Avengers: Secret Wars', type: 'MOVIE', year: 2027, universe: 'MCU', phase: 'FASE 6', timelineOrder: 53, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BYTQyZTQ5MWQtN2M4NC00YWQwLTg3ZTctM2JiZDE4NDBkZDJkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },

  // SONY SPIDER-MAN UNIVERSE
  { title: 'Spider-Man', originalTitle: 'Spider-Man', type: 'MOVIE', year: 2002, universe: 'SONY', phase: 'Universo Homem-Aranha (Legado)', timelineOrder: 101, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://image.tmdb.org/t/p/w500/RbZQL5hXmydecu82UHw9ZGyytB.jpg' },
  { title: 'Spider-Man 2', originalTitle: 'Spider-Man 2', type: 'MOVIE', year: 2004, universe: 'SONY', phase: 'Universo Homem-Aranha (Legado)', timelineOrder: 102, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://image.tmdb.org/t/p/w500/xB05Gyeo2w4RBwt7nZlPkjZzt9X.jpg' },
  { title: 'Spider-Man 3', originalTitle: 'Spider-Man 3', type: 'MOVIE', year: 2007, universe: 'SONY', phase: 'Universo Homem-Aranha (Legado)', timelineOrder: 103, importance: 'COMPLEMENTAR', posterUrl: 'https://image.tmdb.org/t/p/w500/5831VrgpYNPEokBwxurLVpQ3twM.jpg' },
  { title: 'The Amazing Spider-Man', originalTitle: 'The Amazing Spider-Man', type: 'MOVIE', year: 2012, universe: 'SONY', phase: 'Universo Homem-Aranha (Legado)', timelineOrder: 104, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://image.tmdb.org/t/p/w500/gxSsFBCFuDhVQMCuIDoZcmHOqlY.jpg' },
  { title: 'The Amazing Spider-Man 2', originalTitle: 'The Amazing Spider-Man 2', type: 'MOVIE', year: 2014, universe: 'SONY', phase: 'Universo Homem-Aranha (Legado)', timelineOrder: 105, importance: 'COMPLEMENTAR', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNzI0MmQyMzYtZDAzNi00ZWZiLWFjMTgtNzQwOTRjYTFlM2Y3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Venom', originalTitle: 'Venom', type: 'MOVIE', year: 2018, universe: 'SONY', phase: 'Sony Spider-Man Universe', timelineOrder: 106, importance: 'COMPLEMENTAR', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNTYwMDg5MDItNjhmZi00NmVmLThjNWItMmNkMjVkMWRhNzI2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Venom: Let There Be Carnage', originalTitle: 'Venom: Let There Be Carnage', type: 'MOVIE', year: 2021, universe: 'SONY', phase: 'Sony Spider-Man Universe', timelineOrder: 107, importance: 'COMPLEMENTAR', posterUrl: 'https://image.tmdb.org/t/p/w500/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg' },
  { title: 'Morbius', originalTitle: 'Morbius', type: 'MOVIE', year: 2022, universe: 'SONY', phase: 'Sony Spider-Man Universe', timelineOrder: 108, importance: 'OPCIONAL', posterUrl: 'https://image.tmdb.org/t/p/w500/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg' },

  // FOX X-MEN UNIVERSE
  { title: 'X-Men', originalTitle: 'X-Men', type: 'MOVIE', year: 2000, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 201, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNzNjZjQwOTAtNWQ3NC00MmJlLThlZDEtZmUyMWQ3NmE4Y2Y5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'X2: X-Men United', originalTitle: 'X2', type: 'MOVIE', year: 2003, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 202, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDk0NjYxMzIzOF5BMl5BanBnXkFtZTYwMTc1MjU3._V1_FMjpg_UX1000_.jpg' },
  { title: 'X-Men: The Last Stand', originalTitle: 'X-Men: The Last Stand', type: 'MOVIE', year: 2006, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 203, importance: 'COMPLEMENTAR', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMThmOWE3OWEtODJmNC00ZDEzLTk4MWUtNzEzM2RiNmJiZmU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'X-Men Origins: Wolverine', originalTitle: 'X-Men Origins: Wolverine', type: 'MOVIE', year: 2009, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 204, importance: 'OPCIONAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjQwOGEzNjUtNDgwYS00NzUzLWJhZjAtNmFlNzY2YTQyOTllXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'X-Men: First Class', originalTitle: 'X-Men: First Class', type: 'MOVIE', year: 2011, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 205, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTg5OTMxNzk4Nl5BMl5BanBnXkFtZTcwOTk1MjAwNQ@@._V1_FMjpg_UX1000_.jpg' },
  { title: 'The Wolverine', originalTitle: 'The Wolverine', type: 'MOVIE', year: 2013, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 206, importance: 'COMPLEMENTAR', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGU0MzRhMWEtYTBkNS00NzliLWJkMmUtMDFlMjkyOTkyYmZlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'X-Men: Days of Future Past', originalTitle: 'X-Men: Days of Future Past', type: 'MOVIE', year: 2014, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 207, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNzNiYWE4NjMtMTU4OS00NmM4LWE4ZjAtYmE5OTA5NjkzODExXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Deadpool', originalTitle: 'Deadpool', type: 'MOVIE', year: 2016, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 208, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNzY3ZWU5NGQtOTViNC00ZWVmLTliNjAtNzViNzlkZWQ4YzQ4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'X-Men: Apocalypse', originalTitle: 'X-Men: Apocalypse', type: 'MOVIE', year: 2016, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 209, importance: 'COMPLEMENTAR', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNjVhNWY3NjItNmZjOS00NTU3LWFiZTctNzdjNGM5Y2Y0MDUwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Logan', originalTitle: 'Logan', type: 'MOVIE', year: 2017, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 210, importance: 'ESSENCIAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BM2JjODdkMGMtNmY2YS00OGM2LThiY2YtZGYyNzE4Nzc2ODA0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Deadpool 2', originalTitle: 'Deadpool 2', type: 'MOVIE', year: 2018, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 211, importance: 'MUITO_IMPORTANTE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGY3N2ZhYmMtYTlmYi00ZWIzLWJiZWMtMjgxMjljYTk3MDAwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Dark Phoenix', originalTitle: 'Dark Phoenix', type: 'MOVIE', year: 2019, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 212, importance: 'OPCIONAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjcwMDIyNjctMDVmNS00MzkyLTgxMDMtNTFmNTk0NDkyNzdjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { title: 'The New Mutants', originalTitle: 'The New Mutants', type: 'MOVIE', year: 2020, universe: 'FOX', phase: 'Universo Mutante (Legado)', timelineOrder: 213, importance: 'OPCIONAL', posterUrl: 'https://m.media-amazon.com/images/M/MV5BZGVlMjBkYmMtZDhmYS00N2QyLWI2YTgtMDU2N2UwOWYzM2MxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
]

async function main() {

  console.log('Seeding MCU database...')
  
  // Create user
  await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
    },
  })

  // Upsert all titles based on title name
  for (const item of mcuTitles) {
    const exists = await prisma.title.findFirst({
      where: { title: item.title }
    })
    
    if (exists) {
      await prisma.title.update({
        where: { id: exists.id },
        data: item
      })
    } else {
      await prisma.title.create({
        data: item
      })
    }
  }

  // Bulk update stats for series and movies if empty
  await prisma.title.updateMany({
    where: { type: 'SERIES', episodesCount: null },
    data: { episodesCount: 6, episodeDuration: 45, duration: 6 * 45 }
  })
  await prisma.title.updateMany({
    where: { type: 'MOVIE', duration: null },
    data: { duration: 120 } // Default movie duration 2 hours
  })

  console.log('Successfully seeded ' + mcuTitles.length + ' titles.')
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
