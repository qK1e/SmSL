import { Text } from '@codemirror/state';
import {SyntaxNode} from '@lezer/common'

/**
 * @param {SyntaxNode} node 
 * @param {Text} doc
 */
function readNodeContents(node, doc) {
    return doc.slice(node.from, node.to).toString().trim();
}

export {readNodeContents};