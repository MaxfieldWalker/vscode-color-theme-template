"use strict";

import * as assert from "assert";
import { createColorPalette, parseJson } from "../src/colorPalette";
import { ColorPalette } from "../src/types";
import { replace } from "../src/replace";


suite("tests", () => {
    test("replacement", () => {
        const json = parseJson("./test/baselines/example.json");
        const colorPalette = createColorPalette(json);
        const replaced = replace(json, colorPalette);

        const tokenColors = replaced["tokenColors"];
        assert.equal(tokenColors[0]["settings"]["foreground"], "#0F0");
        assert.equal(tokenColors[1]["settings"]["foreground"], "#0000FF80");
        assert.equal(tokenColors[2]["settings"]["foreground"], "#0000FF80");
    });

    test("create color palette", () => {
        const json = parseJson("./test/baselines/colorPalette.json");
        const colorPalette = createColorPalette(json);

        assert.deepEqual(colorPalette.getColor("$color"), "#CFCFCF");
        assert.deepEqual(colorPalette.getAlpha("@alpha"), "80");
    });
});
