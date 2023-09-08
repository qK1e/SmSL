import {parser} from "./parser.js"
import autocompletion from './Autocompletion/autocompletion'
import {LanguageSupport, LRLanguage, indentNodeProp, delimitedIndent} from "@codemirror/language"

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

export const language = LRLanguage.define({
    parser: parser.configure({
      props: [
        indentNodeProp.add({
          Query: delimitedIndent({closing: "}"}),
          GroupRule: delimitedIndent({closing: "}"})
        })
      ]
    }),
    languageData: {
      autocomplete: autocompletion,
      symbolTable: symbolTable
    }
})

export let languageSupport = new LanguageSupport(language);

export let smsl = () => {
  return new LanguageSupport(language);
}