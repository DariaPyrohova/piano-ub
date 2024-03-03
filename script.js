const [whiteKeyList, blackKeyList] = document.getElementsByTagName('ul');

const pianoData = {
  white: [
    {note: 'do1', color: '#f3f8f82f'},
    {note: 're1', color: '#f3f8f82f'},
    {note: 'mi1', color: '#f3f8f82f'},
    {note: 'fa1', color: '#f3f8f82f'},
    {note: 'sol1', color: '#f3f8f82f'},
    {note: 'la1', color: '#f3f8f82f'},
    {note: 'si1', color: '#f3f8f82f'},
    {note: 'do2', color: '#f3f8f82f'},
    {note: 're2', color: '#f3f8f82f'},
    {note: 'mi2', color: '#f3f8f82f'},
  ],
  black: [
    {note: 'doDiez1', color: '#042626'},
    {note: 'reDiez1', color: '#093f3f'},,
    {note: 'faDiez1', color: '#135d5d'},
    {note: 'solDiez1', color: '#208383'},
    {note: 'laDiez1', color: '#35aaaa'},,
    {note: 'doDiez2', color: '#4acdcd'},
    {note: 'reDiez2', color: '#5eefef'},
  ],
};

showKeyboard();

function showKeyboard() {
  const whiteKeysHTML = buildKeysMarkup('white');
  const blackKeysHTML = buildKeysMarkup('black');

  whiteKeyList.innerHTML = whiteKeysHTML;
  blackKeyList.innerHTML = blackKeysHTML;
}

function buildKeysMarkup(color) {
  let html = '';
  const keys = pianoData[color];

  for (const key of keys) {
    html += `<li>${
      key ? `<button style="background: ${key.color}">${key.note}</button>` : ''
    }</li>`;
  }
  
  return html;
}

