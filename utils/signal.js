const { Signale } = require('signale');

const config = {
    displayTimestamp: true,
};

const signal = new Signale({
    types: {
        complete: {
            badge: ' ',
            label: 'create',
        },
    },
});

const interactiveSignal = new Signale({
    interactive: true,
});

signal.config(config);

module.exports = {
    signal,
    interactiveSignal,
};
