"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyConfigDefaults = void 0;
var path = require("path");
/**
 * Applies configuration defaults to a given configuration object.
 *
 * @param config The raw configuration.
 * @returns The input configuration with missing fields defaulted.
 */
function applyConfigDefaults(config) {
    var defaultConfig = {
        filename: 'Database',
        folder: '.',
        tables: [],
        excludedTables: [],
        schemas: [],
        interfaceNameFormat: '${table}Entity',
        additionalProperties: {},
        schemaAsNamespace: false,
        typeOverrides: {},
        typeMap: {},
        template: path.join(__dirname, './template.handlebars')
    };
    return Object.assign(defaultConfig, config);
}
exports.applyConfigDefaults = applyConfigDefaults;
