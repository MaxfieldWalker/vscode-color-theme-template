"use strict";

import * as _ from "lodash";
import { ColorPalette } from "./types";

export function replace(jsonObj: any, colorPalette: ColorPalette): any {
    const result = _.mapValues(jsonObj, replaceValue);

    return omitUnnecessaryValue(result);

    function replaceValue(v: any): any {
        const type = typeof v;
        if (type === "string") {
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
        }
        else if (type === "object") {
            if (_.isArray(v)) {
                return _.map(v, replaceValue);
            } else {
                return _.mapValues(v, replaceValue);
            }
        }
        else {
            return v;
        }
    }

    function omitUnnecessaryValue(obj: any): any {
        // 'colorPalette'の値は不要なので取り除く
        return _.omit(obj, ["colorPalette"]);
    }
}
