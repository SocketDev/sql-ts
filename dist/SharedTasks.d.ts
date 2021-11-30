import { Config } from '.';
import { CaseType } from './Typings';
/**
 * Converts the casing of a string.
 *
 * @export
 * @param {string} name The name to convert.
 * @param {string} caseType The case type to convert into.
 * @returns The converted name.
 */
export declare function convertCase(name: string, caseType: CaseType): string;
/**
 * Resolves a name of an adapter from an alias.
 *
 * @param config The knex configuration.
 * @returns The resolved dialect name.
 */
export declare function resolveAdapterName(config: Config): any;
