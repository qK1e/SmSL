import {parser} from './src/parser'

window.lr = parser;
let doc = "{\n\tname = \"hello\"\n}";
window.initDoc = doc;
document.getElementById('doc').innerHTML = "`" + doc;

let part = parser.startParse(doc);
window.part = part;

document.querySelector('button[name=adv]').addEventListener('click', (e) => {
    let res = part.advance();
    let pos = part.parsedPos;

    let doc = window.initDoc;
    doc = doc.slice(0, pos) + "`" + doc.slice(pos);
    document.getElementById('doc').innerHTML = doc;

    document.getElementById('pos').textContent = part.parsedPos;

    if (res) {
        e.target.disabled = true;
        console.log(res)
    }
})

document.querySelector('button[name=log]').addEventListener('click', () => {
    console.log(part);
})