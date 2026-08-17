import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import https from 'https'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const charactersData = [
  { name: 'Tony Stark / Iron Man', actor: 'Robert Downey Jr.', desc: 'Gênio, bilionário, playboy e filantropo.' },
  { name: 'Steve Rogers / Captain America', actor: 'Chris Evans', desc: 'O primeiro Vingador e símbolo de esperança.' },
  { name: 'Thor Odinson', actor: 'Chris Hemsworth', desc: 'O Deus do Trovão de Asgard.' },
  { name: 'Natasha Romanoff / Black Widow', actor: 'Scarlett Johansson', desc: 'A superespiã e mestra assassina.' },
  { name: 'Bruce Banner / Hulk', actor: 'Mark Ruffalo', desc: 'O gigante esmeralda alimentado por raios gama.' },
  { name: 'Clint Barton / Hawkeye', actor: 'Jeremy Renner', desc: 'Mestre arqueiro e membro original dos Vingadores.' },
  { name: 'Peter Parker / Spider-Man', actor: 'Tom Holland', desc: 'O amigão da vizinhança.' },
  { name: 'Stephen Strange / Doctor Strange', actor: 'Benedict Cumberbatch', desc: 'O Mago Supremo e protetor do Sanctum Sanctorum.' },
  { name: 'Wanda Maximoff / Scarlet Witch', actor: 'Elizabeth Olsen', desc: 'Uma mutante com poderes de manipulação de realidade e Magia do Caos.' },
  { name: 'T\'Challa / Black Panther', actor: 'Chadwick Boseman', desc: 'Rei de Wakanda e protetor da nação.' },
  { name: 'Logan / Wolverine', actor: 'Hugh Jackman', desc: 'Mutante com esqueleto de adamantium e fator de cura.' },
  { name: 'Wade Wilson / Deadpool', actor: 'Ryan Reynolds', desc: 'O Mercenário Tagarela.' },
  { name: 'Bucky Barnes / Winter Soldier', actor: 'Sebastian Stan', desc: 'O soldado invernal em busca de redenção.' },
  { name: 'Sam Wilson / Captain America', actor: 'Anthony Mackie', desc: 'O antigo Falcão, agora o novo Capitão América.' },
  { name: 'Nick Fury', actor: 'Samuel L. Jackson', desc: 'Ex-diretor da S.H.I.E.L.D. e criador da Iniciativa Vingadores.' },
  { name: 'Carol Danvers / Captain Marvel', actor: 'Brie Larson', desc: 'Uma das heroínas mais poderosas do universo.' },
  { name: 'Scott Lang / Ant-Man', actor: 'Paul Rudd', desc: 'O herói que encolhe e entra no Reino Quântico.' },
  { name: 'Hope van Dyne / Wasp', actor: 'Evangeline Lilly', desc: 'A Vespa, brilhante cientista e heroína.' },
  { name: 'Vision', actor: 'Paul Bettany', desc: 'O sintozóide criado a partir de J.A.R.V.I.S. e a Joia da Mente.' },
  { name: 'Loki Laufeyson', actor: 'Tom Hiddleston', desc: 'O Deus da Mentira e príncipe de Asgard.' },
  { name: 'Peter Quill / Star-Lord', actor: 'Chris Pratt', desc: 'O líder dos Guardiões da Galáxia.' },
  { name: 'Gamora', actor: 'Zoe Saldana', desc: 'A mulher mais perigosa da galáxia.' },
  { name: 'Groot', actor: 'Vin Diesel', desc: 'Eu sou Groot.' },
  { name: 'Rocket', actor: 'Bradley Cooper', desc: 'Guaxinim geneticamente modificado e gênio tático.' },
  { name: 'Drax', actor: 'Dave Bautista', desc: 'Drax, o Destruidor.' },
  { name: 'Mantis', actor: 'Pom Klementieff', desc: 'Empata e membro dos Guardiões da Galáxia.' },
  { name: 'Nebula', actor: 'Karen Gillan', desc: 'Filha adotiva de Thanos, transformada em ciborgue.' },
  { name: 'Shang-Chi', actor: 'Simu Liu', desc: 'Mestre do Kung Fu e portador dos Dez Anéis.' },
  { name: 'Marc Spector / Moon Knight', actor: 'Oscar Isaac', desc: 'O punho de Khonshu.' },
  { name: 'Kamala Khan / Ms. Marvel', actor: 'Iman Vellani', desc: 'Fã número um da Capitã Marvel que ganha superpoderes.' },
  { name: 'Yelena Belova', actor: 'Florence Pugh', desc: 'A nova Viúva Negra.' },
  { name: 'Kate Bishop', actor: 'Hailee Steinfeld', desc: 'A arqueira aprendiz de Clint Barton.' },
  { name: 'Matt Murdock / Daredevil', actor: 'Charlie Cox', desc: 'O Demolidor, o Homem sem Medo de Hell\'s Kitchen.' },
  { name: 'Wilson Fisk / Kingpin', actor: 'Vincent D\'Onofrio', desc: 'O Rei do Crime de Nova York.' },
  { name: 'Shuri / Black Panther', actor: 'Letitia Wright', desc: 'Princesa de Wakanda e a nova Pantera Negra.' },
  { name: 'Namor', actor: 'Tenoch Huerta', desc: 'O governante mutante de Talokan.' },
  { name: 'Reed Richards / Mr. Fantastic', actor: 'Pedro Pascal', desc: 'O líder brilhante do Quarteto Fantástico.' },
  { name: 'Sue Storm / Invisible Woman', actor: 'Vanessa Kirby', desc: 'A Mulher Invisível.' },
  { name: 'Johnny Storm / Human Torch', actor: 'Joseph Quinn', desc: 'O Tocha Humana.' },
  { name: 'Ben Grimm / The Thing', actor: 'Ebon Moss-Bachrach', desc: 'O Coisa. Tá na hora do pau!' },
  { name: 'Victor Von Doom / Doctor Doom', actor: 'Robert Downey Jr.', desc: 'O governante da Latvéria e um dos maiores vilões do Multiverso.' }
]

function fetchJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) } catch (e) { resolve(null) }
      })
    }).on('error', reject)
  })
}

async function getActorImage(actorName: string) {
  const data = await fetchJson(`https://api.tvmaze.com/search/people?q=${encodeURIComponent(actorName)}`)
  if (data && data.length > 0 && data[0].person && data[0].person.image) {
    return data[0].person.image.original || data[0].person.image.medium
  }
  return null
}

async function main() {
  console.log('Seeding characters with actor images...')
  for (const c of charactersData) {
    console.log(`Buscando imagem para: ${c.actor}...`)
    const imageUrl = await getActorImage(c.actor)
    
    const data = {
      name: c.name,
      description: `${c.desc} (Interpretado por: ${c.actor})`,
      imageUrl: imageUrl
    }
    
    await prisma.character.upsert({
      where: { name: c.name },
      update: data,
      create: data
    })
  }
  console.log('Characters seeded successfully.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
