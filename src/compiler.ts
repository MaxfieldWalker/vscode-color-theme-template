"use strict";

import * as _ from "lodash";
import { replace, preprocess } from "./replace";
import { parseJson, createColorPalette } from "./colorPalette";
import { createAliasTable } from "./alias";

export function compile(source: string): any {
    // 変換する
    const json = parseJson(source);
    // カラーパレットを作る
    const colorPalette = createColorPalette(json);
    // エイリアステーブルを作る
    const aliasTable = createAliasTable(json);

    // エイリアステーブルで登録されているものを置換する
    const preprocessed = preprocess(json, aliasTable);
    const compiled = replace(preprocessed, colorPalette);
    const omitted = omitUnnecessaryValue(compiled);
    return omitted;
}

function omitUnnecessaryValue(obj: any): any {
    // 'colorPalette' や 'alias' の値は不要なので取り除く
    return _.omit(obj, ["colorPalette", "alias"]);
}
