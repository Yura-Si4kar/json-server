import AppController from "./controller/AppController.mjs";

const body = document.querySelector('.body');
const wrapper = document.querySelector('.wrapper');
const casesBlock = document.querySelector('.case-today');
const shopping = document.querySelector('.case-shoping');
const weather = document.querySelector('.case-weather');

new AppController(body, wrapper, casesBlock, shopping, weather);