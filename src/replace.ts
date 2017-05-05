"use strict";

import * as _ from "lodash";
import { ColorPalette } from "./types";

export function replace(jsonObj: any, colorPalette: ColorPalette): any {
    const result = _.mapValues(jsonObj, replaceValue);

    return omitUnnecessaryValue(result);

    function replaceValue(v: any): any {
        const type = typeof v;
        if (type === "string") {
            // $color@alpha' の部分を置換する
            const r = v.match(/^(\$[^@]+)(@.+)$/) || undefined;
            if (r !== undefined) {
                const [_, color, alpha] = <string[]>r;
                const replaceColor = colorPalette.getColor(color);
                const replaceAlpha = colorPalette.getAlpha(alpha);
                return replaceColor + replaceAlpha;
            } else {
                // '$color'の部分を置換する
                const r = v.match(/^(\$.+)$/) || undefined;
                if (r !== undefined) {
                    const [_, color] = r;
                    const replaceColor = colorPalette.getColor(color);
                    return replaceColor;
                } else {
                    return v;
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
