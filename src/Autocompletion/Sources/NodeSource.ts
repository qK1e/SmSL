import { CompletionContext, CompletionResult } from "@codemirror/autocomplete";
import AutocompletionSourceInterface from "./AutocompletionSourceInterface";
import { SyntaxNode } from '@lezer/common';

export default abstract class NodeSource implements AutocompletionSourceInterface {
    protected nodeId = -1;

    public match(context: CompletionContext): boolean {
        return context.state.tree.resolve(context.pos).node.type.id === this.nodeId;
    }

    public getCompletionResult(context: CompletionContext): CompletionResult {
        const result = {
            from: 0,
            options: []
        } 

        return result;
    }

    protected resolveNode(context: CompletionContext): SyntaxNode {
        return context.state.tree.resolve(context.pos).node;
    }

    protected getSymbolTable(context: CompletionContext): Object {
        const table = context.state.languageDataAt("symbolTable", 0)[0];

        if (!table || typeof table != "object") {
            return {}
        }

        return table;
    }
}