const cliSelect = require('cli-select');
const promptly = require('promptly');
const { signal } = require('./signal');

const configSelect = {
    selected: '✔️ ',
    unselected: '  ',
    valueRenderer: (value, selected) => {
        if (selected) {
            return value;
        }

        return value;
    },
};

const select = async (values) => {
    const { value } = await cliSelect({ values, ...configSelect });

    return value;
};

const prompt = async (question) => {
    const ask = await promptly.prompt(question, {
        validator: (value) => {
            if (value.length < 4) {
                signal.error('Поле должно быть не менее 4-ёх символов');
                throw new Error();
            }

            return value;
        },
    });

    return ask;
};

module.exports = {
    select,
    prompt,
};
