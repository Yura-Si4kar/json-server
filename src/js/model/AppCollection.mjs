export default class AppCollection {
    constructor(key, TODOS_URL, contents) {
        this.contents = contents;
        this._key = key;
        this._url = TODOS_URL;
        this._list = [];
        this._shoppingList = [];
    }

    fetchTodosList() {
        return fetch(this._url, {
            method: 'GET',
        }).then((res) => res.json())
            .then((data) => {
                this._list = data;
        })
    }

    toggleMobileMenu(body, burger, menu) {
        document.querySelector(burger).classList.toggle('activation');
        document.querySelector(menu).classList.toggle('activation');
        document.querySelector(body).classList.toggle('lock');
    }

    onLinkClick(e, links, contents) {
        let index = Array.from(links).indexOf(e.target);

        [...contents].forEach((elem) => {
            elem.classList.remove('show');
            elem.classList.remove('hide');
        })

        contents[index].classList.add('show');

        document.body.classList.remove('lock');
        document.querySelector('.header__burger').classList.remove('activation');
        document.querySelector('.header__menu').classList.remove('activation');
    }

    startPage(contents) {
        [...contents].forEach((elem) => {
            elem.classList.remove('show');
            elem.classList.remove('hide');
        })

        contents[0].classList.add('show');
    }

    chooseDate(target) {
        let dates = document.querySelectorAll('.elem');
        let calendarSection = document.querySelector('.calendar');
        let caseListSection = document.querySelector('.case');

        dates.forEach(day => day.classList.remove('active_day'));
        target.classList.add('active_day');

        calendarSection.classList.add('hide');
        caseListSection.classList.add('show');
    }

    choosePreviusMonth(calendar) {
        calendar.previusMonth;
    }

    chooseNextMonth(calendar) {
        calendar.nextMonth;
    }

    matchSearch(block, value) {
        this._list.forEach(element => {
            console.log(value.length);
            if (element.title.toUpperCase().match(value)) {
                block.innerHTML = `${element.title} о ${element.time}, ${new Date(element.date).toLocaleDateString()}`;
            }
            if (value.length < 1) {
                block.innerHTML = '';
            }
        });
    }

    buttonClick(target) {
        target.classList.toggle('active');
        let panel = target.nextElementSibling;
        if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        panel.style.borderBottom = 'none';
        panel.style.padding = '0';
        } else {
        if (panel.children.length == 0) {
            panel.style.padding = '5px';
            panel.style.textAlign = 'center';
            panel.textContent = '(пусто...)';
            panel.style.fontSize = '14px';
            panel.style.color = 'white';
        }
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.border = '2px dashed #BEBFBE';
        panel.style.borderRadius = '0 0 8px 8px';
        panel.style.borderTop = 'none';
        panel.style.backgroundColor = 'transparent';
        }
    }

    deleteItem(itemId) {
        this._list = this._list.filter(({ id }) => id != itemId);

        return fetch(this._url + itemId, {
            method: 'DELETE',
        });
    }

    addElement(contact) {
        return fetch(this._url, {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())
            .then((data) => this._list.push(data))
    }

    addItem(item) {
        this._shoppingList.push(item);
        this._saveData();
    }
    
    _saveData() {
        localStorage.setItem(this._key, JSON.stringify(this._shoppingList));
    }

    _restoreData() {
        let data = localStorage.getItem(this._key);
    
        return this._shoppingList = data ? JSON.parse(data) : [];
    }

    clearList() {
        localStorage.clear();
    }

    purchasedItem(id) {
        let item = this._shoppingList.find((el) => el.id == id);
        item.done = !item.done;
        item.checked = !item.checked;
        this._saveData();
    }
}