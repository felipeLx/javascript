const noteMap = [
  ['Ab3', 'G3 ', 'Gb3', 'F3 ', 'E3 ', 'Eb3', 'D3 ', 'Db3', 'C3 ', 'B2 ', 'Bb2', 'A2 ', 'Ab2', 'G2 ', 'Gb2', 'F2 ', 'E2 '],
  ['Db4', 'C4 ', 'B3 ', 'Bb3', 'A3 ', 'Ab3', 'G3 ', 'Gb3', 'F3 ', 'E3 ', 'Eb3', 'D3 ', 'Db3', 'C3 ', 'B2 ', 'Bb2', 'A2 '],
  ['Gb4', 'F4 ', 'E4 ', 'Eb4', 'D4 ', 'Db4', 'C4 ', 'B3 ', 'Bb3', 'A3 ', 'Ab3', 'G3 ', 'Gb3', 'F3 ', 'E3 ', 'Eb3', 'D3 '],
  ['B4 ', 'Bb4', 'A4 ', 'Ab4', 'G4 ', 'Gb4', 'F4 ', 'E4 ', 'Eb4', 'D4 ', 'Db4', 'C4 ', 'B3 ', 'Bb3', 'A3 ', 'Ab3', 'G3 '],
  ['Eb5', 'D5 ', 'Db5', 'C5 ', 'B4 ', 'Bb4', 'A4 ', 'Ab4', 'G4 ', 'Gb3', 'F4 ', 'E4 ', 'Eb4', 'D4 ', 'Db4', 'C4 ', 'B3 '],
  ['Ab5', 'G5 ', 'Gb5', 'F5 ', 'E5 ', 'Eb5', 'D5 ', 'Db5', 'C5 ', 'B4 ', 'Bb4', 'A4 ', 'Ab4', 'G4 ', 'Gb4', 'F4 ', 'E4 ']
]

let isPlaying = false

function playNote (stringKey, note, force = false) {
  if (isPlaying || force) {
    console.log(note)
  }
}

window.addEventListener('mousedown', () => {
  isPlaying = true
})

window.addEventListener('mouseup', () => {
  isPlaying = false
})

const svg = document.querySelector('#guitar')

noteMap.forEach((string, stringKey) => {
  string.forEach((note, noteKey) => {
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    area.setAttribute('x', noteKey * 110)
    area.setAttribute('y', 315 + (29.3 * stringKey))
    area.setAttribute('width', 110)
    area.setAttribute('height', 20)
    area.setAttribute('fill', '#fff')
    area.setAttribute('opacity', '0')
    area.addEventListener('click', () => {
      playNote(stringKey, note, true)
    })
    area.addEventListener('mouseover', () => {
      playNote(stringKey, note, false)
    })

    svg.appendChild(area)
  })
})

const stringVibrationTimes = [0, 0, 0, 0, 0, 0]
const strings = Array.from(document.querySelectorAll('.string'))

setInterval(() => {
  strings.forEach((stringEl, key) => {
    if (stringVibrationTimes[key] > 0) {
      stringEl.classList.add('vibrating')
    } else {
      stringEl.classList.remove('vibrating')
    }

    stringVibrationTimes[key] -= 50

    if (stringVibrationTimes[key] < 0) {
      stringVibrationTimes[key] = 0
    }
  })
}, 50)

function playNote (stringKey, note, force = false) {
    if (isPlaying || force) {
      console.log(note)
  
      stringVibrationTimes[stringKey] = 3000
    }
  }

const soundFontUrl = './sound/'
function playNote (stringKey, note, force = false) {
  if (isPlaying || force) {
    console.log(note)
    const audio = new Audio(soundFontUrl + 'FluidR3_GM_electric_guitar_clean-mp3_' + note.trim() + '.mp3')
    audio.play()

    stringVibrationTimes[stringKey] = 3000
  }
}