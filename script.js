const keyboard = document.querySelector('.piano-keyboard');
const [whiteKeyList, blackKeyList] = document.getElementsByTagName('ul');
const playForm = document.querySelector('form');
const textArea = document.getElementById('custom-melody-input');

const sounds = {};
const pianoData = {
  white: ['do-1', 're-1', 'mi-1', 'fa-1', 'sol-1', 'la-1', 'si-1', 'do-2', 're-2', 'mi-2'],
  black: ['do-diez-1', 're-diez-1', , 'fa-diez-1', 'sol-diez-1', 'la-diez-1', , 'do-diez-2', 're-diez-2']
};

let soundsToPlay = [];

const timers = new Map;

showKeyboard();

onkeydown = e => {
  if (e.key === 'Enter') playNotes();
}

keyboard.onmousedown = handleKey;
playForm.onsubmit = handleSubmit;

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
    sounds[key] = new Audio(`piano-sounds/${key}.mp3`);
  }

  return html;
}

function handleKey(e) {
  const btn = e.target;
  const key = btn.id;
  const keySound = sounds[key]; // Audio
  const currentSounds = soundsToPlay;

  if (!keySound) return;

  soundsToPlay.push(keySound);

  if (e.ctrlKey) {
    btn.classList.add('selected');

    return;
  }

  keyboard.querySelectorAll('.selected').forEach(btn => btn.classList.remove('selected'));

  soundsToPlay = [];

  for (const keySound of currentSounds) {
    const timerId = timers.get(keySound);

    if (timerId) {
      clearInterval(timerId);
      timers.delete(keySound);
    }

    keySound.currentTime = 0;
    keySound.volume = 1;
    keySound.play();
  }

  return onmouseup = release(currentSounds);
}

function release(currentSounds) {
  return () => {
    for (const keySound of currentSounds) {
      const timerId = setInterval(() => {
        if (keySound.volume <= 0.05) {
          keySound.pause();
          clearInterval(timerId);
          timers.delete(keySound);
          return;
        }
        keySound.volume *= 0.95;
      }, 10);

      timers.set(keySound, timerId);
    }
  };
}


function playNotes() {
  play(0, 're-diez-1', 120, 0, 'mi-1', 480, 360, 'fa-diez-1', 120, 0, 'sol-1', 480, 360, 're-diez-1', 120, 0, 'mi-1', 360, 0, 'fa-diez-1', 120, 0, 'sol-1', 360, 0, 'do-2', 120, 0, 'si-1', 360, 0, 'mi-1', 120, 0, 'sol-1', 360, 0, 'si-1', 120, 0, 'la-diez-1', 960, 160, 'la-1', 160, 0, 'sol-1', 160, 0, 'mi-1', 160, 0, 're-1', 160, 0, 'mi-1', 160);
}

function play(delay, note, duration, ...args) {
  const e = { target: { id: note } };

  setTimeout(() => {
    const releaseKey = handleKey(e);

    setTimeout(() => {
      releaseKey();

      if (args.length) play(...args)
    }, duration);
  }, delay);
}

function parse(melodyStr) {
  return melodyStr.match(/(\d+ )?([\w-]+)\[(\d+)]/g)
    .flatMap(chunk => {
      const [, delay, note, duration] = chunk.match(/(\d+ )?([\w-]+)\[(\d+)]/);
      return [+delay || 0, note, +duration];
    })
}

function handleSubmit(e) {
  e.preventDefault();
  const musicData = parse(textArea.value);
  play(...musicData);
} 