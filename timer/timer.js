export class Timer {
  constructor(secondsDisplay, tensDisplay) {
    this.secondsDisplay = secondsDisplay
    this.tensDisplay = tensDisplay
    this.interval = null
    this.seconds = 0
    this.tens = 0
  }

  start() {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      if (this.tens < 99) {
        this.tens++
      } else {
        this.seconds++
        this.tens = 0
      }

      this.display()
    }, 10)
  }

  stop() {
    clearInterval(this.interval)
  }

  reset() {
    clearInterval(this.interval)
    this.seconds = 0
    this.tens = 0
    this.display()
  }

  display() {
    this.secondsDisplay.textContent = String(this.seconds).padStart(2, '0')
    this.tensDisplay.textContent = String(this.tens).padStart(2, '0')
  }
}
