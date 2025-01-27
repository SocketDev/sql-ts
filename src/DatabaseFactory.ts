import knex, { Knex } from 'knex'
import { Config, Database } from './Typings'
import * as TableTasks from './TableTasks'
import * as EnumTasks from './EnumTasks'

/**
 * Builds a Database and generates its definitions.
 * 
 * @export
 * @param {Config} [config]     The configuration to use.
 * @returns {Promise<Database>} The generated Database.
 */
export async function buildDatabase (config: Config): Promise<Database> {
  let database: Database
  let db: Knex
  try {
    db = knex(config)
    database = {
      tables: await TableTasks.getAllTables(db, config),
      enums: await EnumTasks.getAllEnums(db, config)
    }
  }
  catch (err) {
    throw err
  }
  finally {
    if (db !== undefined) {
      db.destroy()
    }
  }
  return database
}