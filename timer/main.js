import { Timer } from './timer.js'

document.addEventListener('DOMContentLoaded', () => {
  const secondsDisplay = document.querySelector('#seconds')
  const tensDisplay = document.querySelector('#tens')
  const startButton = document.querySelector('#start')
  const resetButton = document.querySelector('#reset')

  const timer = new Timer(secondsDisplay, tensDisplay)

  startButton.addEventListener('click', () => {
    if (startButton.textContent === 'pause') {
      timer.stop()
      startButton.textContent = 'resume'
      return
    }
    timer.start()
    startButton.textContent = 'pause'
  })

  resetButton.addEventListener('click', () => {
    timer.reset()
    startButton.textContent = 'start'
  })
})
