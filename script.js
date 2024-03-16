const keyboard = document.querySelector('.piano-keyboard');
const [whiteKeyList, blackKeyList] = document.getElementsByTagName('ul');

const sound = {};
const pianoData = {
  white: ['do-1', 're-1', 'mi-1', 'fa-1', 'sol-1', 'la-1', 'si-1', 'do-2', 're-2', 'mi-2'],
  black: ['do-diez-1', 're-diez-1', , 'fa-diez-1', 'sol-diez-1', 'la-diez-1', , 'do-diez-2', 're-diez-2']
};

showKeyboard();

keyboard.onmousedown = handleKey;

function showKeyboard() {
  const whiteKeysHTML = buildKeys('white');
  const blackKeysHTML = buildKeys('black');

  whiteKeyList.innerHTML = whiteKeysHTML;
  blackKeyList.innerHTML = blackKeysHTML;
}

function buildKeys(color) {
  let html = '';
  const keys = pianoData[color];

  for (const key of keys) {
    html += `<li>${key ? `<button id="${key}" class="key"></button>` : ''}</li>`;
    sound[key] = new Audio(`piano-sounds/${key}.mp3`);
  }

  return html;
}

function handleKey(e) {
  const btn = e.target;
  const key = btn.id;
  const keySound = sound[key]; // Audio

  if (!keySound) return;

  keySound.currentTime = 0;
  keySound.volume = 1;
  keySound.play();

  onmouseup = () => {
    const timerId = setInterval(() => {
      if (keySound.volume <= 0.05) {
        keySound.pause();
        clearInterval(timerId);
        return;
      }
      keySound.volume *= 0.95;
    }, 10);
  }
}