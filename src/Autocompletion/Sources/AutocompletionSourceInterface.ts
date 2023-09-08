import { CompletionContext, CompletionResult } from '@codemirror/autocomplete';

export default interface AutocompletionSourceInterface {
    match(context: CompletionContext): boolean;

    getCompletionResult(context: CompletionContext): CompletionResult;
}