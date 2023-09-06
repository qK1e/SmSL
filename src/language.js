import {LRLanguage} from "@codemirror/language"
import {parser} from "./parser.js"
import autocompletion from './Autocompletion/autocompletion'
import {LanguageSupport, indentNodeProp, delimitedIndent} from "@codemirror/language"

export const exampleLanguage = LRLanguage.define({
    parser: parser.configure({
      props: [
        indentNodeProp.add({
          Query: delimitedIndent({closing: "}"})
        })
      ]
    }),
    languageData: {
      autocomplete: autocompletion
    }
})

export let languageSupport = new LanguageSupport(exampleLanguage);

export let smsl = () => {
  return new LanguageSupport(exampleLanguage);
}