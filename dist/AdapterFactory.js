"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAdapter = void 0;
var SharedTasks_1 = require("./SharedTasks");
/**
 * Returns an AdapterInterface that matches the dialect.
 *
 * @export
 * @param {any} dialect The name of SQL adapter that should be returned.
 * @returns {AdapterInterface} The adapter for connecting to a SQL database.
 */
function buildAdapter(config) {
    var dialect = (0, SharedTasks_1.resolveAdapterName)(config);
    var adapter = null;
    try {
        adapter = require("./Adapters/" + dialect);
    }
    catch (err) {
        throw new Error("Unable to find adapter for dialect '" + dialect + "'.");
    }
    return new adapter.default();
}
exports.buildAdapter = buildAdapter;
