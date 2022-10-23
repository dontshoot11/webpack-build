const { Signale } = require("signale")

const config = {
    displayTimestamp: true
}

const interactiveSignal = new Signale({
    interactive: true,
    scope: 'copitrades lands'
})

const signal = new Signale({
    types: {
        complete: {
          badge: ' ',
          label: 'create',
        }
      }
})

signal.config(config)
interactiveSignal.config(config)

module.exports = {
    interactiveSignal,
    signal
}