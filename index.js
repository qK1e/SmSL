import { basicSetup, EditorView } from "codemirror"
import { smsl } from "./src/language"
import { indentWithTab } from "@codemirror/commands"
import { keymap } from '@codemirror/view'
import TreeVisualizer from "./src/Visualisation/TreeVisualizer"

let symbolTable = {
  clients: {
    full_name: "string",
    first_name: "string",
    middle_name: "string",
    last_name: "string",
    age: "number",
    city: "string",
    orders: {
      status: "string",
      items: {
        quantity: "number",
        product: {
          category: {
            identifier: "string",
            name: "string"
          },
          price: "number",
          name: "string"
        }
      }
    },
    contacts: {
      type: "string",
      value: "string",
      validation_code: "number",
      validation_date: "datetime"
    },
    communications: {
      type: "string",
      events: {
        type: "string",
        date: "datetime"
      },
      id: "number"
    },
    channels: {
      type: "string",
      subscribed: "boolean"
    },
    mailing_categories: {
      name: "string",
      subscribed: "boolean"
    }
  }
}

let ev = new EditorView({
  doc: "",
  extensions: [
    basicSetup, 
    smsl(symbolTable),
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