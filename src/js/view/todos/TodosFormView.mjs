export default class TodosFormView {
    static form_template = `<div class="case-today__head">
        <form class="form">
            <p class="case-input">
                <label for="time-input" class="title">Виберіть час події: </label>
                <input class="time-input input" type="time" name="time">
            </p>
            <p>
                <label for="color" class="title">Вибрати колір події: </label>
                <select name="color" class='input'>
                    <option class="red" value="red">red</option>
                    <option class="green" value="green">green</option>
                    <option class="yellow" value="yellow">yellow</option>
                    <option class="blue" value="blue">blue</option>
                </select>
            </p>
            <p class="form-input">
                <label for="title" class="title">Введіть назву події: </label>
                <input type="text" name="title" id="case" class="new-case input">
            </p>
            <button class="add-case__btn"><span class="add-case__btn-text">Запланувати подію</span>+</button>
        </form>
    </div>`;

    constructor(config = {}) {
        this.el = TodosFormView.form_template;
        this.init(config);
    }

    init(config) {
        document.addEventListener('DOMContentLoaded', (e) => {
            this.inputs = document.querySelectorAll('.input');
            this.form = document.querySelector('.form');

            this.form.addEventListener('submit', (e) => {
                e.preventDefault();

                const contact = {};

                this.inputs.forEach((inp) => {
                    contact[inp.name] = inp.value;
                });

                config.onFormSubmit && config.onFormSubmit(contact);

                this.form.reset();
            })
        })
    }
}
