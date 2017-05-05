#!/usr/bin/env node

"use strict";

import { sys, ExitStatus } from "./sys";
import { replace } from "./replace";
import { parseJson, createColorPalette } from "./colorPalette";
import * as fs from "fs";
import * as path from "path";

function execute(args: string[]): void {
    // 引数を処理する
    if (args.length != 2) {
        sys.stdout.newLine();
        sys.stdout.writeLine("Usage:");
        sys.stdout.newLine();
        sys.stdout.writeLine("$ vscode-color-theme-template <source> <out>");
        sys.stdout.newLine();
        sys.exit(ExitStatus.Fail);
    }

    const [source, out] = args;

    // 変換する
    const json = parseJson(source);
    const colorPalette = createColorPalette(json);
    const compiled = replace(json, colorPalette);

    // 結果を書き込み
    makeSureDirExists(out);
    fs.writeFileSync(out, JSON.stringify(compiled, undefined, 4));

    // 終了
    sys.exit(ExitStatus.Success);
}

function makeSureDirExists(filePath: string): void {
    const dirName = path.dirname(filePath);
    if (fs.existsSync(dirName)) return;

    makeSureDirExists(dirName);
    fs.mkdirSync(dirName);
}

const args = process.argv.slice(2);
execute(args);
