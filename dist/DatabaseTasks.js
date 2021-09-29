"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyDatabase = void 0;
var handlebars = require("handlebars");
var fs = require("fs");
/**
 * Converts a Database definition to TypeScript.
 *
 * @export
 * @param {Database} database The Database definition.
 * @param {Config} config The configuration to use.
 * @returns A TypeScript definition, optionally wrapped in a namespace.
 */
function stringifyDatabase(database, config) {
    var templateString = fs.readFileSync(config.template, 'utf-8');
    var compiler = handlebars.compile(templateString);
    database.tables.sort(function (tableA, tableB) { return tableA.name.localeCompare(tableB.name); });
    var template = {};
    for (var _i = 0, _a = database.tables; _i < _a.length; _i++) {
        var table = _a[_i];
        if (template[table.schema] === undefined) {
            template[table.schema] = { tables: [], enums: [] };
        }
        template[table.schema].tables.push(table);
    }
    database.enums.sort(function (enumA, enumB) { return enumA.name.localeCompare(enumB.name); });
    for (var _b = 0, _c = database.enums; _b < _c.length; _b++) {
        var enumm = _c[_b];
        if (template[enumm.schema] === undefined) {
            template[enumm.schema] = { tables: [], enums: [] };
        }
        template[enumm.schema].enums.push(enumm);
    }
    return compiler({
        grouped: template,
        config: config
    });
}
exports.stringifyDatabase = stringifyDatabase;
