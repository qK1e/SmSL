import { CompletionContext, CompletionResult, Completion, insertCompletionText } from '@codemirror/autocomplete';
import ProgramNodeSource from './Sources/ProgramNodeSource';
import IdNodeSource from './Sources/IdNodeSource';

const sources = [
    new ProgramNodeSource(),
    new IdNodeSource()
]

export default function autocomplete(context: CompletionContext) {
    for (const source of sources) {
        if ( source.match(context) ) {
            return source.getCompletionResult(context);
        }
    }
}