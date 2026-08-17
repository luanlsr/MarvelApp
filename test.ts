import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'

console.log('DATABASE_URL:', process.env.DATABASE_URL)

const db = new Database('./dev.db')
const adapter = new PrismaBetterSqlite3(db)
const prisma = new PrismaClient({ adapter })

async function main() {
  const users = await prisma.user.findMany()
  console.log(users)
}
main()
