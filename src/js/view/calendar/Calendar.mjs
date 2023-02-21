export default class Calendar {
    constructor(divId) {
        this.divId = divId;
        this.DaysofWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
        this.Month = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
        this.background = [
        './img/january.jpg',
        './img/february.jpg',
        './img/march.jpg',
        './img/april.jpg',
        './img/may.jpg',
        './img/june.jpg',
        './img/july.jpg',
        './img/august.jpg',
        './img/september.jpg',
        './img/october.jpg',
        './img/november.jpg',
        './img/december.jpg',
        ];
        this.date = new Date();
        this.currMonth = this.date.getMonth();
        this.currYear = this.date.getFullYear();
        this.currDay = this.date.getDate();
        this.currTime = this.date.getTime();
    }
    // Наступний місяць
    get nextMonth() {
        if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
        } else {
        this.currMonth = this.currMonth + 1;
        this.image(this.currMonth + 1)
        }
        this.showcurr;
    };
    // Попередній місяць
    get previusMonth() {
        if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
        } else {
        this.currMonth = this.currMonth - 1;
        this.image(this.currMonth - 1);
        }
        this.showcurr;
    };
    image(index) {
        // let image = new Image();
        // image.src = './img/january.jpg';
        document.body.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.background[index]}) center no-repeat`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.transition = '0.9s';
    }
    //Поточний місяць
    get showcurr() {
        this.showMonth(this.currYear, this.currMonth);
        this.image(this.currMonth);
    };
    //Показати місяць (рікб місяць)
    showMonth(y, m) {
        let date = new Date();
        //Перший день неділі у поточному місяці
        let firstDayOfMonth = new Date(y, m, 7).getDay();
        // Останній день поточного місяця
        let lastDateOfMonth = new Date(y, m + 1, 0).getDate();
        // Останній день попереднього місяця
        let lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
        let html = '<table class="calendar-body">';
        // Запис Вибраного місяця та року
        html += '<thead class="calendar-head"><tr>';
        html += '<td colspan = "7">' + this.Month[m] + ' ' + y + '</td>';
        html += '</tr></thead>';
        // Заголовок днів неділі
        html += '<tr class="days">';
        for (let i = 0; i < this.DaysofWeek.length; i++) {
        html += '<td>' + this.DaysofWeek[i] + '</td>';
        }
        html += '</tr>';
        //Записуємо дні
        let i = 1;
        do {
        let day = new Date(y, m, i).getDay();
        //Почати нову стрічку в понеділок
        if (day == 1) {
            html += '<tr class="date">';
        }
        //Якщо перший день неділі не понеділок показати останні дні попереднього місяця
        else if (i == 1) {
            html += '<tr class="date">';
            let k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (let c = 0; c < firstDayOfMonth; c++) {
            html += `<td class="not-current-prew" data-year='${this.currYear}' data-month='${this.currMonth}' data-day='${k}'>` + k + '</td>';
            k++;
            }
        }
        //Записуємо поточний день в цикл
        let chk = new Date();
        let chkY = chk.getFullYear();
        let chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += `<td class="today elem active_day" data-year='${this.currYear}' data-month='${this.currMonth}' data-day='${i}''>` + i + '</td>';
        } else {
            html += `<td class="normal elem" data-year='${this.currYear}' data-month='${this.currMonth}' data-day='${i}''>` + i + '</td>';
        }
        //Закрити стрічку в неділю
        if (day == 0) {
            html += '</tr>';
        }
        //Якщо останній день місяця не недія, показати перші дні наступного місяця
        else if (i == lastDateOfMonth) {
            let k = 1;
            for (day; day < 7; day++) {
            html += `<td class="not-current-next" data-year='${this.currYear}' data-month='${this.currMonth}' data-day='${k}'>` + k + '</td>';
            k++;
            }
        }
        i++;
        } while (i <= lastDateOfMonth);
        //Кінець таблиці
        html += '</table>';
        //Записуємо html в div
        document.querySelector('.' + this.divId).innerHTML = html;
    };
}