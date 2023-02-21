export default class HeaderView {
    static header_template = `<header class="header">
        <div class="container">
            <div class="header__body">
                <a href="#" class="header__logo">
                    <img class="header__img" src="./img/home-filled.svg"
                        width='50' height='50' alt="ninja">
                </a>
                <div class="header__burger">
                    <span></span>
                </div>
                <nav class="header__menu">
                    <ul class="header__list" id="header__list">
                        <li>
                            <a href="#" class="header__link calendar_link">Календар</a>
                        </li>
                        <li>
                            <a href="#" class="header__link cases_link">Список справ на сьогодні</a>
                        </li>
                        <li>
                            <a href="#" class="header__link weather_link">Погода</a>
                        </li>
                        <li>
                            <a href="#" class="header__link shopping_link">Список покупок</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>`;

    static BODY_SELECTOR = '.body';
    static HEADER_BURGER_SELECTOR = '.header__burger';
    static HEADER_MENU_SELECTOR = '.header__menu';
    
    constructor(body, config = {}) {
        this.el = HeaderView.header_template;
        document.addEventListener('DOMContentLoaded', () => {
            this.links = document.querySelectorAll('.header__link');
            this.contents = document.querySelectorAll('.slide');
            this.renderStartApp(this.contents);
        });

        body.addEventListener('click', (e) => {
            if (e.target.classList.contains('header__burger')) {
                config.onBurgerClick && config.onBurgerClick(
                    HeaderView.BODY_SELECTOR,
                    HeaderView.HEADER_BURGER_SELECTOR,
                    HeaderView.HEADER_MENU_SELECTOR
                );
            } else if (e.target.closest('.header__menu')) {
                config.onMenuLinksClick && config.onMenuLinksClick(e, this.links, this.contents);
            } else if (e.target.classList.contains('header__img')) {
                config.onHomePageClick && config.onHomePageClick(this.contents);
            }
        })
    }

    renderStartApp(array) {
        for (let i = 0; i < array.length; i++){
            array[i].classList.remove('show');
        }
        
        array[0].classList.add('show');
        console.log(array);
    }
}
