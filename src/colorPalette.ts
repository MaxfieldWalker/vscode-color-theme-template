"use strict";

import * as fs from "fs";
import * as _ from "lodash";
import { ColorPalette } from "./types";

export function parseJson(jsonFilePath: string): object {
    const s = fs.readFileSync(jsonFilePath).toString();

    try {
        const json = JSON.parse(s);
        return json;
    } catch (ex) {
        const json = eval("(" + s + ")");
        return json;
    }
}

export function createColorPalette(jsonObj: any): ColorPalette {
    const palette = new ColorPalette();

    // colorPaletteキーの値はあるか
    if (_.has(jsonObj, "colorPalette")) {
        const colorPalette = jsonObj["colorPalette"];
        const pairs = _.toPairs(colorPalette);

        for (const pair of pairs) {
            const [key, value] = pair;
            if (typeof value === "string") {
                if (key.startsWith("$")) {
                    // '$'ではじまるならcolorのMapに
                    if (isValidColor(value)) {
                        palette.addColor(key, value);
                    } else {
                        throw new Error(`Invalid color: ${value}`);
                    }
                } else if (key.startsWith("@")) {
                    // '@'ではじまるならアルファ値のMapに
                    if (isValidAlpha(value)) {
                        palette.addAlpha(key, value);
                    } else {
                        throw new Error(`Invalid alpha: ${value}`);
                    }
                } else {
                    throw new Error(`Invalid key '${key}': the color key must start with '$' or '@'`);
                }
            } else {
                throw new Error(`Invalid value: the value type must be 'string'`);
            }
        }
    }

    return palette;
}

function isValidColor(color: string): boolean {
    // #で始まっているか
    if (!color.startsWith("#")) return false;

    // 3桁または6桁か
    const rest = color.substr(1);
    if (!(rest.length == 3 || rest.length == 6)) return false;

    // 全ての文字が '0'-'F'のいずれかか
    if (!isHexValue(rest)) return false;

    return true;
}

function isValidAlpha(alpha: string): boolean {
    // 2桁か
    if (alpha.length != 2) return false;

    // 0'-'F'のいずれかか
    if (!isHexValue(alpha)) return false;

    return true;
}

function isHexValue(s: string): boolean {
    return (s.match(/[0-9a-fA-F]+/) || undefined) !== undefined;
}
