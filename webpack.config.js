'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {  
    rules: [ // правила
    {
      test: /\.m?js$/,   // находим js файлы
      exclude: /(node_modules|bower_components)/,  // какие фалый мы исключаем из выборки 
      use: { // как и что будем использовать
        loader: 'babel-loader',  // связывает  babel с webpack, его надо установить: 'npm i --save-dev babel-loader'
        options: { // опции
            presets: [['@babel/preset-env', {
                debug: true, // показывает ошибки с иной
                corejs: 3, // - это библиотека кт опр. какие полифилы нам нужны, чтобы не устанавливать лишнее
                useBuiltIns: "usage"   // разрешаем corejs автоматически выбирать и устанавливать нужные полифилы
            }]]
        }
      }
    }
    ]
}
};
