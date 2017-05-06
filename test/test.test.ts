"use strict";

import * as assert from "assert";
import { createColorPalette, parseJson } from "../src/colorPalette";
import { ColorPalette } from "../src/types";
import { replace } from "../src/replace";


suite("tests", () => {
    test("replacement", () => {
        const json = parseJson("./test/baselines/test2.json");
        const colorPalette = createColorPalette("./test/baselines/test2.json");
        const replaced = replace(json, colorPalette);
        console.log(JSON.stringify(replaced, undefined, 4));

    });

    test("create color palette", () => {
        const json = parseJson("./test/baselines/colorPalette.json");
        const colorPalette = createColorPalette(json);

        assert.deepEqual(colorPalette.getColor("$color"), "#CFCFCF");
        assert.deepEqual(colorPalette.getAlpha("@alpha"), "80");
    });
});
