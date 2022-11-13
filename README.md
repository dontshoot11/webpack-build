# webpack-build

Сборка на вебпаке

Чтобы создать проект

npm run create

чтобы собрать его в дев моде

npx webpack --env project=название проекта

чтобы открыть его на локалке

npx webpack serve --env project=название проекта

чтобы собрать прод версию

npx webpack --node-env=production --env project=название проекта

### Работа с тегом img

Чтобы webpack правильно указал ссылку при сборке, в верстке нужно указать путь через require

img(src=require('../../static/img/cat.png'))
