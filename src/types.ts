"use strict";

export class ColorPalette {
    private colorMap: Map<string, string>;
    private alphaMap: Map<string, string>;

    constructor(colorMap: Map<string, string>, alphaMap: Map<string, string>) {
        this.colorMap = colorMap;
        this.alphaMap = alphaMap;
    }

    public getColor(color: string) {
        const v = this.colorMap.get(color);
        if (v === undefined) {
            throw new Error(`Color map doesn't have the color registed with the key '${color}'`);
        } else {
            return v;
        }
    }

    public getAlpha(alpha: string) {
        const v = this.alphaMap.get(alpha);
        if (v === undefined) {
            throw new Error(`Alpha map doesn't have the alpha registed with the key '${alpha}'`);
        } else {
            return v;
        }
    }
}
