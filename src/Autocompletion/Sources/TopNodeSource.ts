import NodeSource from "./NodeSource";
import { Program } from "../../parser.terms";
import { Completion, CompletionContext, CompletionResult, insertCompletionText } from "@codemirror/autocomplete";
import { EditorSelection } from "@codemirror/state";
import { EditorView } from "codemirror";

export default class ProgramNodeSource extends NodeSource {
    protected nodeId: number = Program;

    match(context: CompletionContext): boolean {
        const text = context.state.doc.toString().trim();

        const symbolTable = this.getSymbolTable(context);
        const top = Object.keys(symbolTable)[0];

        if (!top) {
            return false;
        }

        return super.match(context) 
            && ( text.length === 0 || top.startsWith(text))
    }

    getCompletionResult(context: CompletionContext): CompletionResult {
        const symbolTable = this.getSymbolTable(context);
        const top = Object.keys(symbolTable)[0];

        if (!top) {
            return {
                from: 0,
                options: []
            } ;
        }

        const options = [
            {
                label: top, 
                apply: ( view: EditorView, completion: Completion, from: number, to: number) => {
                    const insertion = `${top} {\n\t\n}`;

                    const transactionSpec = insertCompletionText(view.state, insertion, 0, view.state.doc.length);
                    transactionSpec.selection = EditorSelection.cursor(insertion.indexOf('\t') + 1);

                    view.dispatch( view.state.update( transactionSpec ) );
                }
            }
        ]

        return {
            from: context.pos,
            options: options
        };
    }
}