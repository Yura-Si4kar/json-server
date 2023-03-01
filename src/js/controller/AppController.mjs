import { TODOS_URL, WEATHER_URL } from "../config.mjs";
import AppCollection from "../model/AppCollection.mjs";
import CalendarView from "../view/calendar/calendarView.mjs";
import HeaderView from "../view/header/headerView.mjs";
import ShoppingFormView from "../view/shopping/ShoppingFormView.mjs";
import ShoppingListView from "../view/shopping/ShoppingListView.mjs";
import TodosFormView from "../view/todos/TodosFormView.mjs";
import TodosListView from "../view/todos/TodosListView.mjs";
// import Weather from "../view/weather/Weather.mjs";
import loadWeather from "../view/weather/WeatherView.mjs";

export default class AppController {
    constructor(body, wrapper, casesBlock, shopping, weather) {
    // Підключаємо та вставляємо головне меню
        this.headerView = new HeaderView(body, {
            onBurgerClick: this.clickOnBurger,
            onMenuLinksClick: this.clickOnMenuLink,
            onHomePageClick: this.openStartPage,
        });
        body.insertAdjacentHTML('afterbegin', this.headerView.el);
    // Підключаємо та вставляємо календар
        this.calendarView = new CalendarView({
            onDayClick: this.clickOnTheDate,
            onPrewMonthBtnClick: this.previusMonth,
            onNextMonthBtnClick: this.nextMonth,
            onSearchFormInput: this.onSearchInput,
        });
        wrapper.insertAdjacentHTML('afterbegin', this.calendarView.el);
    // Підключаємо та вставляємо список справ посортовані за часом та форму
        this.todosListView = new TodosListView({
            onButtonClick: this.buttonClick,
            onDeleteBtnClick: this.clickDelete,
        });
        this.todosFormView = new TodosFormView({
            onFormSubmit: this.submitForm,
        });
        casesBlock.insertAdjacentHTML('afterbegin', this.todosFormView.el);
        casesBlock.insertAdjacentHTML('afterbegin', this.todosListView.el);
    // Додаємо віджет погоди
        this.weatherWidget = loadWeather();
        // this.widget = new Weather({
        //     showPosition: this.currentPosition,
        // });
        // weather.insertAdjacentHTML('afterbegin', this.widget.el);
    // Додаємо блок покупок
        this.shoppingListView = new ShoppingListView({
            onClearListBtnClick: this.clearShoppingList,
            checkedItem: this.onCheckBoxClick,
        });
        this.shoppingFormView = new ShoppingFormView({
            onShoppingFormSubmit: this.shoppingFormSubmit,
        });
        shopping.insertAdjacentHTML('afterbegin', this.shoppingFormView.el);
        shopping.insertAdjacentHTML('afterbegin', this.shoppingListView.el);
    // Головна колекція
        this._collection = new AppCollection(this.shoppingFormView.key, TODOS_URL, WEATHER_URL);
    // Рендер списку покупок при загрузці
        this.shoppingListView.renderShoppingList(this._collection._restoreData());
    // Рендер списку справ при загрузці
        this._collection
            .fetchTodosList()
            .then(() => {
                this.todosListView.renderList(this._collection._list)
                console.log(this._collection._list);
            });
    }

    clickOnBurger = (body, burger, menu) => {
        this._collection.toggleMobileMenu(body, burger, menu);
    }

    clickOnMenuLink = (e, links, contents) => {
        this._collection.onLinkClick(e, links, contents);
    }

    openStartPage = (contents) => {
        this._collection.startPage(contents);
    }

    clickOnTheDate = (target) => {
        this._collection.chooseDate(target);
        this.todosListView.renderList(this._collection._list);
    }

    previusMonth = (calendar) => {
        this._collection.choosePreviusMonth(calendar);
    }

    nextMonth = (calendar) => {
        this._collection.chooseNextMonth(calendar);
    }

    onSearchInput = (block, value) => {
        this._collection.matchSearch(block, value);
    }
    
    buttonClick = (target) => {
        this._collection.buttonClick(target);
    }

    clickDelete = (id) => {
        this._collection.deleteItem(id);
        this.todosListView.renderList(this._collection._list);
    }

    submitForm = (contact) => {
        this._collection.addElement({ ...contact, date: this.todosListView.getCurrentDayData() })
            .then(() => this.todosListView.renderList(this._collection._list));
    }

    shoppingFormSubmit = (item) => {
        this._collection.addItem(item);
        this.shoppingListView.renderShoppingList(this._collection._shoppingList);
    }

    clearShoppingList = () => {
        this._collection.clearList();
        this.shoppingListView.renderShoppingList(this._collection._restoreData());
    }

    onCheckBoxClick = (id) => {
        this._collection.purchasedItem(id);
        this.shoppingListView.renderShoppingList(this._collection._restoreData());
    }

    currentPosition = (position) => {
        this._collection.fetchWeatherDataWithPosition(position);
    }
}
