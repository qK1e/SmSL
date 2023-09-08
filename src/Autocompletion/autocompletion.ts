import { CompletionContext, CompletionResult, Completion, insertCompletionText } from '@codemirror/autocomplete';
import { Tree } from '@lezer/common';
import * as terms from '../parser.terms';
import { EditorView } from 'codemirror';
import { EditorSelection } from '@codemirror/state';
import ProgramNodeSource from './Sources/ProgramNodeSource';
import IdNodeSource from './Sources/IdNodeSource';

const sources = [
    new ProgramNodeSource(),
    new IdNodeSource()
]

export default function autocomplete(context: CompletionContext) {
    console.log(context.state.tree.resolve(context.pos).node.name)

    for (const source of sources) {
        if ( source.match(context) ) {
            return source.getCompletionResult(context);
        }
    }
}