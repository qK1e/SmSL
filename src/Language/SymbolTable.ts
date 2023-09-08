import Symbol from "./Symbol";

export default class SymbolTable {
    top: Symbol;

    constructor(top: Symbol) {
        this.top = top;
    }

    public getForPath(path: string[]): Symbol {
        return this.top;
    }
}