export default class TodosListView {
    static list_template = `<div class="case-accardion">
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='1'>00:00</button>
            <div class="content-block-list eight-oclock-am" data-time="00:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='2'>01:00</button>
            <div class="content-block-list eight-oclock-am" data-time="01:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='3'>02:00</button>
            <div class="content-block-list eight-oclock-am" data-time="02:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='4'>03:00</button>
            <div class="content-block-list eight-oclock-am" data-time="03:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='5'>04:00</button>
            <div class="content-block-list eight-oclock-am" data-time="04:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='6'>05:00</button>
            <div class="content-block-list eight-oclock-am" data-time="05:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='7'>06:00</button>
            <div class="content-block-list eight-oclock-am" data-time="06:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='8'>07:00</button>
            <div class="content-block-list eight-oclock-am" data-time="07:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='9'>08:00</button>
            <div class="content-block-list eight-oclock-am" data-time="08:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='10'>09:00</button>
            <div class="content-block-list nine-oclock-am" data-time="09:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='11'>10:00</button>
            <div class="content-block-list ten-oclock-am" data-time="10:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='12'>11:00</button>
            <div class="content-block-list eleven-oclock-am" data-time="11:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='13'>12:00</button>
            <div class="content-block-list twelve-oclock-am" data-time="12:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='14'>13:00</button>
            <div class="content-block-list one-oclock-am" data-time="13:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='15'>14:00</button>
            <div class="content-block-list two-oclock-am" data-time="14:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='16'>15:00</button>
            <div class="content-block-list three-oclock-am" data-time="15:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='17'>16:00</button>
            <div class="content-block-list four-oclock-am" data-time="16:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='18'>17:00</button>
            <div class="content-block-list five-oclock-am" data-time="17:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='19'>18:00</button>
            <div class="content-block-list six-oclock-am" data-time="18:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='20'>19:00</button>
            <div class="content-block-list seven-oclock-am" data-time="19:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='21'>20:00</button>
            <div class="content-block-list eight-oclock-am" data-time="20:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='22'>21:00</button>
            <div class="content-block-list eight-oclock-am" data-time="21:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='23'>22:00</button>
            <div class="content-block-list eight-oclock-am" data-time="22:00"></div>
        </div>
        <div class="case-accardion_box">
            <button type="button" class="list-btn" data-id='24'>23:00</button>
            <div class="content-block-list eight-oclock-am" data-time="23:00"></div>
        </div>
    </div>`;

    static TODOS_INSERT_TEMPLATE = `<span class='input-string' data-id='{{id}}' data-date='{{date}}' style='color:{{color}};'>
        <span class="task-content">
            <span class="time">{{time}}: 
                <span class="input-text">{{title}}</span>
            </span>
            <button class="close-btn" id='delete-btn'>X</button>
        </span>
    </span>`;

    
    static ACARDION_BUTTON_SELECTOR = '.list-btn';
    static DELETE_BUTTON_CLASS = 'close-btn';

    static createTodosList(task) {
        return TodosListView.TODOS_INSERT_TEMPLATE.replace('{{id}}', task.id)
                                            .replace('{{time}}', task.time)
                                            .replace('{{title}}', task.title)
                                            .replace('{{color}}', task.color)
                                            .replace('{{date}}', task.date);
    }

    constructor(config = {}) {
        this.el = TodosListView.list_template;
        this.init(config);
    }
    
    init(config) {
        document.addEventListener('DOMContentLoaded', (e) => {
            this.block = document.querySelector('.case-list');
            this.dom = document.querySelector('.case-accardion');
            this.blocks = document.querySelectorAll('.content-block-list');
            this.btns = document.querySelectorAll(TodosListView.ACARDION_BUTTON_SELECTOR);
            
            this.btns.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    config.onButtonClick && config.onButtonClick(e.target);
                })
            });

            this.dom.addEventListener('click', (e) => {
                if (e.target.classList.contains(TodosListView.DELETE_BUTTON_CLASS)) {
                    config.onDeleteBtnClick && config.onDeleteBtnClick(e.target.closest('.input-string').dataset.id)
                }
            })
        })
    }

    renderList(list) {
        this.blocks.forEach((block) => {
            block.innerHTML = this.filteringTheListByTime(block, list).map(TodosListView.createTodosList).join('\n');
        });

        this.getPercentageOfCases(list);
    }
    
    filteringTheListByDate(list) {
        let activeDay = this.getCurrentDayData().toLocaleDateString();
        let filterListByDate = list.filter((item) =>
            new Date(item.date).toLocaleDateString() == activeDay
        );

        return filterListByDate;
    }

    filteringTheListByTime(block, list) {
        let filterListByTime = this.filteringTheListByDate(list).filter((todo) =>
            parseInt(todo.time) == parseInt(block.getAttribute('data-time'))
        );

        filterListByTime.sort((a,b) => a.time.replace(':', '') - b.time.replace(':', ''));

        return filterListByTime;
    }

    getCurrentDayData() {
        this.currentDay = document.querySelector('.active_day');

        return new Date(parseInt(this.currentDay.dataset.year),
                        parseInt(this.currentDay.dataset.month),
                        parseInt(this.currentDay.dataset.day)
        );
    }

    getPercentageOfCases(list) {
        this.blocks.forEach((block, i) => {
        let workColor = this.filteringTheListByTime(block, list).filter((item) => item.color == 'red');
        let restColor = this.filteringTheListByTime(block, list).filter((item) => item.color == 'green');
        let sportColor = this.filteringTheListByTime(block, list).filter((item) => item.color == 'yellow');
        let hobbyColor = this.filteringTheListByTime(block, list).filter((item) => item.color == 'blue');

        let red = (workColor.length * 100) / this.filteringTheListByTime(block, list).length;
        let green = (restColor.length * 100) / this.filteringTheListByTime(block, list).length + red;
        let yellow = (sportColor.length * 100) / this.filteringTheListByTime(block, list).length + green;
        let blue = (hobbyColor.length * 100) / this.filteringTheListByTime(block, list).length + yellow;

        if (this.filteringTheListByDate(list).length === 0) {
            this.btns[i].style.background = 'transparent';
        }
            this.btns[i].style.background = `linear-gradient(to right,red ${red}%, green ${red}%, green ${green}%, yellow ${green}%, yellow ${yellow}%, blue ${yellow}%, blue ${blue}% )`;
        if (this.filteringTheListByTime(block, list).length == 0) {
            this.btns[i].style.background = 'transparent';
        }
    })
    }
}