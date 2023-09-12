import { CompletionContext, CompletionResult, Completion } from "@codemirror/autocomplete";
import { SyntaxNode, TreeCursor } from '@lezer/common';
import NodeSource from "./NodeSource";
import { Query, Id, Func } from "../../parser.terms";

export default class QueryNodeSource extends NodeSource {
    protected nodeId: number = Query;
    private context: CompletionContext

    public getCompletionResult(context: CompletionContext): CompletionResult {
        this.context = context;

        const candidates = this.getAutocompletions(context);

        if (!candidates) {
            return {
                from: 0,
                options: []
            };
        }
        
        const options: Completion[] = [];
        for (let candidate of candidates) {
            options.push({
                label: candidate
            });
        }

        const word = context.state.wordAt(context.pos);
        const length = word 
            ? word.to - word.from 
            : 0;

        return {
            from: context.pos - length,
            options: options
        }
    }

    private getAutocompletions(context: CompletionContext): string[] {
        const node = this.resolveNode(context);

        let path: string[] = []
        let cursor: TreeCursor = node.cursor();

        while(cursor.node.type.id === Query) {
            path = this.getQueryPath(cursor.node).concat(path);
            cursor.parent();
        }

        let tables: Object = this.getSymbolTable(context);

        for (let id of path) {
            if (! tables.hasOwnProperty(id)) {
                return [];
            }

            tables = tables[id];
        }

        return Object.keys(tables);
    }

    private getLSidePath(node: SyntaxNode): string[] {
        const cursor = node.cursor();

        if (!cursor.firstChild()) {
            return [];
        }

        const path: string[] = [];
        path.push( this.getLSideItemName(cursor.node) );

        while (cursor.nextSibling()) {
            path.push( this.getLSideItemName(cursor.node) );
        }

        return path;
    }

    private getQueryPath(node: SyntaxNode): string[] {
        if (!node.firstChild) {
            return []
        }

        return this.getLSidePath(node.firstChild)
    }

    private getLSideItemName(node: SyntaxNode): string
    {
        if (node.type.id === Func) {
            return node.firstChild ? 
                this.readContents(node.firstChild) + "()"
                : "";
        }

        if (node.type.id === Id) {
            return this.readContents(node).replace('~', '');
        }

        return "";
    }

    private readContents(node: SyntaxNode): string {
        return this.context.state.doc.slice(node.from, node.to).toString().trim();
    }
}