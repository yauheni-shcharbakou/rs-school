class GuessingGame {
    constructor() {
        this.old = 0
        this.l = 0
        this.r = 0
    }

    setRange(min, max) {
        this.l = min
        this.r = max
    }

    guess() {
        this.old = Math.ceil((this.r + this.l) / 2)
        return this.old
    }

    lower() { this.r = this.old }

    greater() { this.l = this.old }
}

module.exports = GuessingGame;
