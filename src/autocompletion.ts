import { CompletionContext } from '@codemirror/autocomplete';
import { Tree, SyntaxNode } from '@lezer/common'
import * as terms from './parser.terms'

let structure = {
    clients: ['id', 'local_id', 'age', 'full_name', 'orders', 'contacts', 'subscriptions'],
    orders: ['local_id', 'items', 'date'],
    contacts: ['type', 'value', 'validation_code', 'validation_date'],
    subscriptions: ['type', 'value']
}

export default function autocomplete(context: CompletionContext) {
    if (!context.explicit) {
        return null;
    }

    let word = context.matchBefore(/[a-zA-z_]*/);

    if (! word ) {
        return null;
    }

    let tree: Tree = context.state.tree;
    let currentNode = tree.resolve(context.pos);

    if (currentNode.type.id === terms.QueryRule && word.from === word.to) {
        let idNode = currentNode.firstChild?.firstChild;
        let parentIdentifier = context.state.doc.slice(idNode?.from, idNode?.to).toString();

        let opts: Array<string>|null = structure[parentIdentifier];

        if (!opts) {
            return null;
        }
    
        let options = {
            'from': word.from,
            'options': []
        }
    
        for (let opt of opts) {
            options.options.push({label: opt})
        }
    
        return options;
    }

    if (currentNode.type.id != terms.LSide && word.from !== word.to) {
        return null;
    }

    let firstParent = currentNode.parent;

    if (! firstParent) {
        return null;
    }

    let options = {
        from: word?.from,
        options: [
            {label: 'clients'}
        ]
    }

    let parent: SyntaxNode|null = firstParent;
    let parentIdentifier = null;
    while (parent = parent?.parent) {
        if (!parent) {
            return options;
        }

        if (parent.type.id == terms.QueryRule) {
            let idNode = parent.firstChild?.firstChild;
            parentIdentifier = context.state.doc.slice(idNode?.from, idNode?.to).toString();

            break;
        }
    }

    let opts: Array<string>|null = structure[parentIdentifier];

    if (!opts) {
        return null;
    }

    if ( word.from !== word.to) {
        opts = opts.filter((item: string) => {
            return item.startsWith(word?.text);
        })
    }

    options = {
        'from': word.from,
        'options': []
    }

    for (let opt of opts) {
        options.options.push({label: opt})
    }

    return options;
}