import { ColumnDefinition, TableDefinition } from './Adapters/AdapterInterface';
import { Knex } from 'knex';
import { Column, Config } from './Typings';
/**
 * Returns all columns in a given Table using a knex context.
 *
 * @export
 * @param {knex} db The knex config to use.
 * @param {TableDefinition} table The table to return columns for..
 * @param {Config} config The configuration to use.
 * @returns {Promise<Column[]>}
 */
export declare function getColumnsForTable(db: Knex, table: TableDefinition, config: Config): Promise<Column[]>;
/**
 * Generates the full column name comprised of the table, schema and column.
 *
 * @export
 * @param {string} tableName The name of the table that contains the column.
 * @param {string} schemaName The name of the schema that contains the table.
 * @param {string} columnName The name of the column.
 * @returns {string} The full table name.
 */
export declare function generateFullColumnName(tableName: string, schemaName: string, columnName: string): string;
/**
 * Converts a database type to that of a JavaScript type.
 *
 * @export
 * @param {Column} column The column definition to convert.
 * @param {Table} table The table that the column belongs to.
 * @param {Config} config The configuration object.
 * @returns {string}
 */
export declare function convertType(column: ColumnDefinition, table: TableDefinition, config: Config): string;
/**
 * Converts the enum type, prepending the schema if required.
 *
 * @export
 * @param {ColumnDefinition} column The column definition with an enum type.
 * @param {Config} config The configuration object.
 * @returns {string}
 */
export declare function convertEnumType(column: ColumnDefinition, config: Config): string;
