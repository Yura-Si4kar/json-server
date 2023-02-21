import AppController from "./controller/AppController.mjs";

const body = document.querySelector('.body');
const wrapper = document.querySelector('.wrapper');
const casesBlock = document.querySelector('.case-today');
const shopping = document.querySelector('.case-shoping')

new AppController(body, wrapper, casesBlock, shopping);