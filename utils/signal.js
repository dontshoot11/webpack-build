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

signal.config(config);

module.exports = {
    signal,
};
