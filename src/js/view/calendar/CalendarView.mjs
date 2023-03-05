import Calendar from "./Calendar.mjs";

export default class CalendarView{
    static calendarBlock = `<section class="calendar slide">
        <div>
            <button class="btnPrev" type="button">Попередній</button>
            <button class="btnNext" type="button">Наступний</button>
        </div>
        <div class="divCal"></div>
        <div class="search">
            <label class="search-title" for="search-input">Пошук події за назвою</label>
            <input class="search-input" type="text" id="search-input">
        </div>
        <div class="search-result"></div>
    </section>`;

    constructor(config = {}) {
        this.init();
        this.calendar = new Calendar('divCal');
        this.initCalendar(this.calendar, config);
    }

    init() {
        this.el = CalendarView.calendarBlock;
    }

    initCalendar(calendar, config) {
        document.addEventListener('DOMContentLoaded', () => {
            this.calendarBlock = document.querySelector('.calendar');
            this.searchInput = document.querySelector('.search-input');
            this.resultBlock = document.querySelector('.search-result');
            // Почати календар
            calendar.showcurr;
            // Прив'язуємо кнопки "Наступний" і "Попередній"
            this.calendarBlock.addEventListener('click', (e) => {
                if (e.target.classList.contains('elem')) {
                    config.onDayClick && config.onDayClick(e.target);
                } else if (e.target.classList.contains('btnPrev') || e.target.classList.contains('not-current-prew')) {
                    config.onPrewMonthBtnClick && config.onPrewMonthBtnClick(calendar);
                } else if (e.target.classList.contains('btnNext') || e.target.classList.contains('not-current-next')) {
                    config.onPrewMonthBtnClick && config.onNextMonthBtnClick(calendar);
                }
            });

            this.searchInput.addEventListener('input', () => {
                config.onSearchFormInput && config.onSearchFormInput(this.resultBlock, this.getInputValue());
            })
        })
    }

    getInputValue() {
        return this.searchInput.value;
    }
}
