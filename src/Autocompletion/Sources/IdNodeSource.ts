import NodeSource from "./NodeSource";
import { CompletionContext, CompletionResult } from "@codemirror/autocomplete";
import { SyntaxNode, TreeCursor } from '@lezer/common';
import { Query, Func, Id } from "../../parser.terms";

export default class IdNodeSource extends NodeSource {
    protected nodeId: number = Id;
    protected context: CompletionContext;

    public getCompletionResult(context: CompletionContext): CompletionResult {
        this.context = context;

        const candidates: string[] = this.getAutocompletions(context);

        if (!candidates) {
            return {
                from: 0,
                options: []
            };
        }
        
        const options: string[] = [];
        for (let candidate of candidates) {
            options.push({
                label: candidate
            });
        }

        let length = context.state.wordAt(context.pos)?.to - context.state.wordAt(context.pos)?.from;

        return {
            from: context.pos - length,
            options: options
        }
    }

    private getAutocompletions(context: CompletionContext): string[] {
        const node = this.resolveNode(context);

        let path: string[] = []

        let cursor: TreeCursor = node.cursor();
        cursor.parent();
        path.push( ...this.getLSidePath(cursor.node) );

        cursor.parent();
        while(cursor.parent()) {
            if (cursor.node.type.id === Query) {
                path = this.getQueryPath(cursor.node).concat(path);
            }
        }

        console.log(path);

        //find autocompletion in table for given path
        let tables: Object = context.state.languageDataAt("symbolTable")[0];
        let unfinished: string = path.pop();

        for (let id of path) {
            if (! tables.hasOwnProperty(id)) {
                return;
            }

            tables = tables[id];
        }

        const candidates: string[] = Object.keys(tables);

        return candidates.filter((candidate: string) => {
            return candidate.startsWith(unfinished);
        });
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

        console.log(path);

        return path;
    }

    private getQueryPath(node: SyntaxNode): string[] {
        return this.getLSidePath(node.firstChild)
    }

    private getLSideItemName(node: SyntaxNode): string
    {
        if (node.type.id === Func) {
            return this.readContents(node.firstChild) + "()";
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