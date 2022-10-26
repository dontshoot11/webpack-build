const { resolve } = require('path');
const fs = require('fs-extra');
const { signal } = require('../utils/signal');
const { ROOT_PATH } = process.env;

const generate = (path, deps) => {
    if (fs.existsSync(path)) {
        throw new Error(
            `Проект с таким именем уже существует. Попробуйте еще!`
        );
    } else {
        fs.mkdirSync(path);
    }

    const template = `${process.cwd()}/generator/template`;

    signal.await('Генерация нового проекта');
    fs.copy(template, path, function (err) {
        if (err) {
            console.error(err, template);
        } else {
            console.log('success!');
        }
    });

    signal.success(`Проект успешно создан`);
};

module.exports = {
    generate,
};
