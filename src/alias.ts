"use strict";

import { AliasTable } from "./types";
import * as _ from "lodash";


export function createAliasTable(jsonObj: any): AliasTable {
    const table = new AliasTable();

    const alias = jsonObj["alias"];
    if (alias) {
        const pairs = _.toPairs(alias);
        for (const [key, value] of pairs) {
            if (typeof value === "string") {
                if (key.startsWith("$") && value.startsWith("$")) {
                    table.addAlias(key, value);
                }
                else if (key.startsWith("@") && value.startsWith("@")) {
                    table.addAlias(key, value);
                } else {
                    throw new Error("The key or value doesn't start with '$ or '@'");
                }
            } else {
                throw new Error(`Invalid value: the value type must be 'string'`);
            }
        }
    }

    return table;
}