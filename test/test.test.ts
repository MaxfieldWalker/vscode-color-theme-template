"use strict";

import * as assert from "assert";
import { createColorPalette, parseJson } from "../src/colorPalette";
import { ColorPalette } from "../src/types";
import { replace } from "../src/replace";
import { compile } from "../src/compiler";


suite("tests", () => {
    test("replacement", () => {
        const replaced = compile("./test/baselines/example.json");

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

    test("alias test", () => {
        const compiled = compile("./test/baselines/alias.json");

        const tokenColors = compiled["tokenColors"];
        assert.equal(tokenColors[0]["settings"]["foreground"], "#0000FF");
        assert.equal(tokenColors[1]["settings"]["foreground"], "#0000FF80");
    });
});
