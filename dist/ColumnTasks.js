"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertEnumType = exports.convertType = exports.generateFullColumnName = exports.getColumnsForTable = void 0;
var AdapterFactory = require("./AdapterFactory");
var SharedTasks = require("./SharedTasks");
var TypeMap_1 = require("./TypeMap");
var EnumTasks = require("./EnumTasks");
var SchemaTasks = require("./SchemaTasks");
/**
 * Returns all columns in a given Table using a knex context.
 *
 * @export
 * @param {knex} db The knex config to use.
 * @param {TableDefinition} table The table to return columns for..
 * @param {Config} config The configuration to use.
 * @returns {Promise<Column[]>}
 */
function getColumnsForTable(db, table, config) {
    return __awaiter(this, void 0, void 0, function () {
        var adapter, columns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adapter = AdapterFactory.buildAdapter(config);
                    return [4 /*yield*/, adapter.getAllColumns(db, config, table.name, table.schema)];
                case 1:
                    columns = _a.sent();
                    return [2 /*return*/, columns.map(function (c) { return (__assign(__assign({}, c), { propertyName: SharedTasks.convertCase(c.name.replace(/ /g, ''), config.columnNameCasing), propertyType: convertType(c, table, config) })); })];
            }
        });
    });
}
exports.getColumnsForTable = getColumnsForTable;
/**
 * Generates the full column name comprised of the table, schema and column.
 *
 * @export
 * @param {string} tableName The name of the table that contains the column.
 * @param {string} schemaName The name of the schema that contains the table.
 * @param {string} columnName The name of the column.
 * @returns {string} The full table name.
 */
function generateFullColumnName(tableName, schemaName, columnName) {
    var result = tableName;
    if (schemaName != null && schemaName !== '') {
        result = schemaName + "." + result;
    }
    result += "." + columnName;
    return result;
}
exports.generateFullColumnName = generateFullColumnName;
/**
 * Converts a database type to that of a JavaScript type.
 *
 * @export
 * @param {Column} column The column definition to convert.
 * @param {Table} table The table that the column belongs to.
 * @param {Config} config The configuration object.
 * @returns {string}
 */
function convertType(column, table, config) {
    if (column.isEnum) {
        return convertEnumType(column, config);
    }
    var fullname = generateFullColumnName(table.name, table.schema, column.name);
    var convertedType = null;
    var overrides = config.typeOverrides;
    var userTypeMap = config.typeMap;
    // Start with user config overrides.
    convertedType = overrides[fullname];
    // Then check the user config typemap.
    if (convertedType == null) {
        convertedType = Object.keys(userTypeMap).find(function (t) { return userTypeMap[t].includes(column.type); });
    }
    // Then the schema specific typemap.
    if (convertedType == null) {
        var adapterName = SharedTasks.resolveAdapterName(config);
        var perDBTypeMap_1 = TypeMap_1.default[adapterName];
        if (perDBTypeMap_1 != null) {
            convertedType = Object.keys(perDBTypeMap_1).find(function (f) { return perDBTypeMap_1[f].includes(column.type); });
        }
    }
    // Then the global type map.
    if (convertedType == null) {
        var globalMap_1 = TypeMap_1.default['global'];
        convertedType = Object.keys(globalMap_1).find(function (f) { return globalMap_1[f].includes(column.type); });
    }
    // Finally just any type.
    return convertedType == null ? 'any' : convertedType;
}
exports.convertType = convertType;
/**
 * Converts the enum type, prepending the schema if required.
 *
 * @export
 * @param {ColumnDefinition} column The column definition with an enum type.
 * @param {Config} config The configuration object.
 * @returns {string}
 */
function convertEnumType(column, config) {
    var enumName = EnumTasks.generateEnumName(column.type, config);
    if (column.enumSchema != null && config.schemaAsNamespace) {
        var schemaName = SchemaTasks.generateSchemaName(column.enumSchema);
        return schemaName + "." + enumName;
    }
    return enumName;
}
exports.convertEnumType = convertEnumType;
