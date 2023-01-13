import { Config, Database, Table, Enum } from './Typings'
import * as Handlebars from 'handlebars'
import * as fs from 'fs'
import { Knex } from 'knex'
import * as TableTasks from './TableTasks'
import * as EnumTasks from './EnumTasks'
import { isNumber } from 'lodash'

interface Template {
  [key:string]: {
    tables: Table[]
    enums: Enum[]
  }
}

/**
 * Converts a Database definition to TypeScript.
 * 
 * @export
 * @param {Database} database The Database definition.
 * @param {Config} config The configuration to use.
 * @returns A TypeScript definition, optionally wrapped in a namespace.
 */
export function stringifyDatabase (database: Database, config: Config): string {
  const templateString = fs.readFileSync(config.template, 'utf-8')
  const compiler = Handlebars.compile(templateString, { noEscape: true })
  // For table enums, we want numeric values to not be wrapped in quotes.
  Handlebars.registerHelper('handleNumeric', function (aString) {
    return isNumber(aString) ? aString : new Handlebars.SafeString(`'${aString}'`)
  })
  database.tables.sort((tableA, tableB) => tableA.name.localeCompare(tableB.name))
  database.enums.sort((enumA, enumB) => enumB.name.localeCompare(enumA.name))
  const template: Template = {}
  for (let table of database.tables) {
    if (template[table.schema] === undefined) {
      template[table.schema] = { tables: [], enums: [] }
    }
    template[table.schema].tables.push(table)
  }
  database.enums.sort((enumA, enumB) => enumA.name.localeCompare(enumB.name))
  for (let enumm of database.enums) {
    if (template[enumm.schema] === undefined) {
      template[enumm.schema] = { tables: [], enums: [] }
    }
    template[enumm.schema].enums.push(enumm)
  }
  return compiler({
    grouped: template,
    tables: database.tables,
    enums: database.enums,
    custom: config.custom,
    config
  })
}

/**
 * Constructs a database by fetching the tables and enums.
 *
 * @export
 * @param {Config} config The sql-ts config to use.
 * @param {Knex} db The database context to use.
 * @returns {Promise<Database>} The constructed Database.
 */
export async function generateDatabase (config: Config, db: Knex): Promise<Database> {
  const database = {
    tables: await TableTasks.getAllTables(db, config),
    enums: await EnumTasks.getAllEnums(db, config)
  }
  return database
}
