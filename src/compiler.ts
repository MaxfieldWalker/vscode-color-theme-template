"use strict";

import { replace } from "./replace";
import { parseJson, createColorPalette } from "./colorPalette";
import { createAliasTable } from "./alias";

export function compile(source: string): any {
    // 変換する
    const json = parseJson(source);
    // カラーパレットを作る
    const colorPalette = createColorPalette(json);
    // エイリアステーブルを作る
    const aliasTable = createAliasTable(json);
    colorPalette.registerAliases(aliasTable);

    const compiled = replace(json, colorPalette);

    return compiled;
}
