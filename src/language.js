import {parser} from "./parser.js"
import autocompletion from './Autocompletion/autocompletion'
import {LanguageSupport, LRLanguage, indentNodeProp, delimitedIndent} from "@codemirror/language"

export let smsl = (symbolTable) => {
  const language = LRLanguage.define({
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
  });

  return new LanguageSupport(language);
}