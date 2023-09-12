import { CompletionContext } from '@codemirror/autocomplete';
import ProgramNodeSource from './Sources/TopNodeSource';
import IdNodeSource from './Sources/IdNodeSource';
import QueryNodeSource from './Sources/QueryNodeSource';

const sources = [
    new ProgramNodeSource(),
    new IdNodeSource(),
    new QueryNodeSource()
]

export default function autocomplete(context: CompletionContext) {
    console.log(context.state.tree.resolve(context.pos).node)

    for (const source of sources) {
        if ( source.match(context) ) {
            return source.getCompletionResult(context);
        }
    }
}