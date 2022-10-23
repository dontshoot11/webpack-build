const { resolve } = require('path');
const fs = require('fs-extra');
const { signal } = require('../utils/signal');

const generate = (path, deps) => {
    if (fs.existsSync(path)) {
        throw new Error(
            `Проект с таким именем уже существует. Попробуйте еще!`
        );
    } else {
        fs.mkdirSync(path);
    }

    const template = resolve(process.cwd(), '/generator/template');

    signal.await('Генерация нового проекта');
    fs.copy(
        '/Users/n.artem/webpack-build/generator/template',
        path,
        function (err) {
            if (err) {
                console.error(err, template);
            } else {
                console.log('success!');
            }
        }
    );

    signal.success(`Проект успешно создан`);
};

module.exports = {
    generate,
};