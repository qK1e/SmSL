import {styleTags, tags} from "@lezer/highlight"

export const highlighting = styleTags({
    Negation: tags.keyword,
    Operator: tags.operator,
    Identifier: tags.name,
    Number: tags.number,
    String: tags.string
})