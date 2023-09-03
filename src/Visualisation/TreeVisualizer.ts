import { Tree, SyntaxNode } from '@lezer/common';
import { Text } from '@codemirror/state';

export default class TreeVisualizer {
    static displayTree(tree: Tree, doc: Text) {
        let container = document.getElementById('tree');

        if (! container) {
            return;
        }

        container.innerHTML = '';
        
        let indentation = 0;
        let node = tree.topNode;

        this.displayNode(node, container, indentation);
    }

    static displayNode(node: SyntaxNode, container: HTMLElement, indentation: number) {
        let nodeContainer = document.createElement('div');

        let indentationNode = document.createElement('span');
        indentationNode.innerText = "|\x20\x20\x20\x20".repeat(indentation);
        indentationNode.className = "indent";
        indentationNode.style.whiteSpace = "pre"
        nodeContainer.appendChild(indentationNode);

        let type = node.type.name;
        let typeNode = document.createElement('span');
        typeNode.innerText = type;
        typeNode.className = "node_type";
        nodeContainer.appendChild(typeNode);

        container.appendChild(nodeContainer);

        if (!node.firstChild) {
            return;
        }
        
        indentation += 1;
        
        let child: SyntaxNode|null = node.firstChild;

        do {
            this.displayNode(child, container, indentation)
        } while (child = child.nextSibling)
    }
}