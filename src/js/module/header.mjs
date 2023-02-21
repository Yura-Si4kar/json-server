export default function headerInit() {
  document.querySelector('.header__burger').addEventListener('click', ()=>{
    document.querySelector('.header__burger').classList.toggle('activation');
    document.querySelector('.header__menu').classList.toggle('activation');
    document.querySelector('body').classList.toggle('lock');
  });
}