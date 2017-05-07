"use strict";

export class ColorPalette {
    private colorMap: Map<string, string>;
    private alphaMap: Map<string, string>;

    constructor() {
        this.colorMap = new Map();
        this.alphaMap = new Map();
    }

    public addColor = (key: string, color: string) => addValueToMap(this.colorMap, key, color);
    public addAlpha = (key: string, alpha: string) => addValueToMap(this.alphaMap, key, alpha);

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

export class AliasTable {
    private aliasMap: Map<string, string>;

    constructor() {
        this.aliasMap = new Map();
    }

    public addAlias(alias: string, to: string): void {
        addValueToMap(this.aliasMap, alias, to);
    }

    public getAliasTo(alias: string): string {
        const to = this.aliasMap.get(alias);
        if (to === undefined) throw new Error(`Alias ${alias} is not registered`);

        return to;
    }

    public getAliasEntries(): [string, string][] {
        return Array.from(this.aliasMap.entries());
    }
}

function addValueToMap(map: Map<string, string>, key: string, value: string) {
    // 重複はエラー
    if (map.has(key)) {
        throw new Error(`The map has already the value against the key '${key}'`);
    } else {
        map.set(key, value);
    }
}
