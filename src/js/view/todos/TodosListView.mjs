export default class TodosListView {
    static list_template = () => {
        let template = '<div class="case-accardion">';
        for (let i = 0; i < 24; i++) {
            template += `
                <div class="case-accardion_box">
                    <button type="button" class="list-btn" data-id='${i}'>${i < 10 ? '0' + i : i}:00</button>
                    <div class="content-block-list eight-oclock-am" data-time="${i < 10 ? '0' + i : i}:00"></div>
                </div>`;
        }
        template += '</div>';
        return template;
    };

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
        this.el = TodosListView.list_template();
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