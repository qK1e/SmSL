import { CompletionContext, CompletionResult, Completion, insertCompletionText } from '@codemirror/autocomplete';
import { Tree } from '@lezer/common';
import * as terms from '../parser.terms';
import { EditorView } from 'codemirror';
import { EditorSelection, SelectionRange } from '@codemirror/state';

export default function autocomplete(context: CompletionContext) {
    let options: Completion[] = [];

    const tree: Tree = context.state.tree;
    const node = tree.resolve(context.pos);

    if ( node.type.id === terms.Program) {
        const text = context.state.doc.toString().trim();

        if (text.length !== 0 && !'clients'.startsWith(text)) {
            return;
        }

        options = [
            {
                label: 'clients', 
                apply: ( view: EditorView, completion: Completion, from: number, to: number) => {
                    console.log('hello')
                    
                    const insertion = 'clients {\n\t\n}';

                    const transactionSpec = insertCompletionText(view.state, insertion, 0, view.state.doc.length);
                    transactionSpec.selection = EditorSelection.cursor(insertion.indexOf('\t') + 1);

                    view.dispatch( view.state.update( transactionSpec ) );
                }
            }
        ]
    }

    let result: CompletionResult = {
        from: context.pos,
        options: options
    }

    return result;
}