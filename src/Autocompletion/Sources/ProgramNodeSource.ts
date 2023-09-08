import NodeSource from "./NodeSource";
import { Program } from "../../parser.terms";
import { Completion, CompletionContext, CompletionResult, insertCompletionText } from "@codemirror/autocomplete";
import { EditorSelection } from "@codemirror/state";
import { EditorView } from "codemirror";

export default class ProgramNodeSource extends NodeSource {
    protected nodeId: number = Program;

    match(context: CompletionContext): boolean {
        const text = context.state.doc.toString().trim();

        return super.match(context) 
            && ( text.length === 0 || 'clients'.startsWith(text))
    }

    getCompletionResult(context: CompletionContext): CompletionResult {
        const options = [
            {
                label: 'clients', 
                apply: ( view: EditorView, completion: Completion, from: number, to: number) => {
                    const insertion = 'clients {\n\t\n}';

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