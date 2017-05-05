"use strict";

import * as assert from "assert";
import { createColorPalette, parseJson } from "../src/colorPalette";
import { ColorPalette } from "../src/types";
import { replace } from "../src/replace";


suite("test", () => {
    test("test", () => {
        const result = createColorPalette("./test/baselines/test.json");

        console.log(result);
    });

    test("replacement test", () => {
        const json = parseJson("./test/baselines/test2.json");
        const colorPalette = createColorPalette("./test/baselines/test2.json");
        const replaced = replace(json, colorPalette);
        console.log(JSON.stringify(replaced, undefined, 4));

    });
});
