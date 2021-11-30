"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAdapterName = exports.convertCase = void 0;
var change_case_1 = require("change-case");
/**
 * Converts the casing of a string.
 *
 * @export
 * @param {string} name The name to convert.
 * @param {string} caseType The case type to convert into.
 * @returns The converted name.
 */
function convertCase(name, caseType) {
    switch (caseType) {
        case 'pascal':
            return (0, change_case_1.pascalCase)(name);
        case 'camel':
            return (0, change_case_1.camelCase)(name);
        case 'lower':
            return name.toLowerCase();
        case 'upper':
            return name.toUpperCase();
        default:
            return name;
    }
}
exports.convertCase = convertCase;
/**
 * Resolves a name of an adapter from an alias.
 *
 * @param config The knex configuration.
 * @returns The resolved dialect name.
 */
function resolveAdapterName(config) {
    var _a, _b;
    var dialect = (_a = config.dialect) !== null && _a !== void 0 ? _a : config.client;
    var aliases = {
        'pg': 'postgres',
        'sqlite3': 'sqlite',
        'mysql2': 'mysql'
    };
    return (_b = aliases[dialect]) !== null && _b !== void 0 ? _b : dialect;
}
exports.resolveAdapterName = resolveAdapterName;
