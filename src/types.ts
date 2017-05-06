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

    /**
     * エイリアスをカラーパレットに登録する
     * 例:
     * "$border" -> "$white" というエイリアスが登録されている場合
     * "$border" -> "#FFF" をカラーパレットに登録する
     */
    public registerAliases(aliasTable: AliasTable): void {
        for (const [alias, to] of aliasTable.getAliasEntries()) {
            if (to.startsWith("$")) {
                addValueToMap(this.colorMap, alias, this.getColor(to));
            } else {
                addValueToMap(this.alphaMap, alias, this.getAlpha(to));
            }
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
