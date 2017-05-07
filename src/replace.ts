"use strict";

import * as _ from "lodash";
import { ColorPalette, AliasTable } from "./types";

export function replace(jsonObj: object, colorPalette: ColorPalette): object {
    return traverseJsonValues(jsonObj, v => {
        // 色とアルファ値が両方変数で指定されている場合
        // e.g. $color@alpha'
        const r = v.match(/^(\$[^@]+)(@.+)$/) || undefined;
        if (r !== undefined) {
            const [, color, alpha] = <string[]>r;
            const replaceColor = colorPalette.getColor(color);
            const replaceAlpha = colorPalette.getAlpha(alpha);
            return replaceColor + replaceAlpha;
        } else {
            // 色のみが変数で指定されている場合
            // e.g. '$color'
            const r = v.match(/^(\$.+)$/) || undefined;
            if (r !== undefined) {
                const [, color] = r;
                const replaceColor = colorPalette.getColor(color);
                return replaceColor;
            } else {
                // アルファ値のみが変数で指定されている場合
                // e.g. '#0000FF@alpha
                const r = v.match(/^(#[0-9a-fA-F]+)(@.+)$/) || undefined;
                if (r != undefined) {
                    const [, color, alpha] = r;
                    const replaceAlpha = colorPalette.getAlpha(alpha);
                    return color + replaceAlpha;
                } else {
                    return v;
                }
            }
        }
    });
}

export function preprocess(jsonObj: object, aliasTable: AliasTable): object {
    return traverseJsonValues(jsonObj, v => v.replace(new RegExp(/\$\$[^\$]+/, "g"), (s) => aliasTable.getAliasTo(s)));
}

function traverseJsonValues(json: object, callback: (value: string) => string): object {
    const result = _.mapValues(json, visitor);

    return result;

    function visitor(v: any): any {
        const type = typeof v;
        if (type === "string") {
            return callback(v);
        } else if (type === "object") {
            if (_.isArray(v)) {
                return _.map(v, visitor);
            } else {
                return _.mapValues(v, visitor);
            }
        }
        else {
            return v;
        }
    }
}
