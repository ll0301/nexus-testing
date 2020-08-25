"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const nexus_1 = require("nexus");
nexus_1.schema.addToContext(() => {
    return {
        db: db_1.db,
    };
});
