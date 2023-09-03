import { basicSetup, EditorView } from "codemirror"
import { smsl } from "./src/language"
import { indentWithTab } from "@codemirror/commands"
import { keymap } from '@codemirror/view'
import TreeVisualizer from "./src/Visualisation/TreeVisualizer"

let ev = new EditorView({
  doc: "clients {\n\t\n}",
  extensions: [
    basicSetup, 
    smsl(),
    keymap.of([indentWithTab])
  ],
  parent: document.getElementById('editor')
});



window.editor = ev;

document.querySelector("button[name=refresh]").addEventListener('click', () => {
  let tree = ev.state.values[6].tree;
  console.log(tree);
  TreeVisualizer.displayTree(tree, ev.state.doc);
});