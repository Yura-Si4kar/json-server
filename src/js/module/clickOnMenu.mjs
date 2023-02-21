export default function clickOnMenu(e, slideElements) {
    const links = document.querySelectorAll('.header__link');

    let index = Array.from(links).indexOf(e.target);

    [...slideElements].forEach((elem) => {
        elem.classList.remove('show');
        elem.classList.remove('hide');
    })

    slideElements[index].classList.add('show');
    document.body.classList.remove('lock');
    document.querySelector('.header__burger').classList.remove('activation');
    document.querySelector('.header__menu').classList.remove('activation');
}