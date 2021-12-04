import dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/.env' })

interface DatabaseTypes {
  database: string | undefined
  user: string | undefined
  password: string | undefined
}

export const dbSetting: DatabaseTypes = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
}
