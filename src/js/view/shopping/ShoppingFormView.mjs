export default class ShoppingFormView {
    static form_template = `<form class="shopping-form">
        <label class="form-title" for="buy">Сьогодні я хочу: </label>
        <input class="shopping-input" type="text" name="buy" id="buy" placeholder="введіть текст..."
            autofocus>
        <button class="add-item">Купити</button>
    </form>`;

    static STORAGE_KEY = `shoppingList`;

    constructor(config = {}) {
        this.el = ShoppingFormView.form_template;
        this.key = ShoppingFormView.STORAGE_KEY;
        this.init(config);
    }

    init(config) {
        document.addEventListener('DOMContentLoaded', () => {
            this.form = document.querySelector('.shopping-form');
            this.formInput = document.querySelector('.shopping-input');

            this.form.addEventListener('submit', (e) => {
                e.preventDefault();

                let obj = {
                    id: Date.now(),
                    buy: this.getItemValue(),
                    done: false,
                    checked: false,
                };

                for (var item in obj) { 
                    while (this.validation(obj[item])) {
                        this.form.reset();
                        alert('Заповніть всі поля');
                        document.querySelector('.shopping-input').onfocus();
                    }
                }

                config.onShoppingFormSubmit && config.onShoppingFormSubmit(obj);

                this.form.reset();
            })
        })
    }

    validation(val) {
        return val === null || val === '' || 3 > val.length;
    }  

    getItemValue() {
        return this.formInput.value;
    }
}
