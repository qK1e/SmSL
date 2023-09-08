import SymbolTable from "./SymbolTable";

export default class Symbol {
    name: string;
    type: string;
    contents: Map<string, Symbol>|null;

    constructor(name: string, type: string, contents: Map<string, Symbol>|null) {
        this.name = name;
        this.type = type;
        this.contents = contents;
    }
}