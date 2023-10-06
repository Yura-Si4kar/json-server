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
                <input type="text" name="title" id="case" class="new-case input" placeholder='Введіть більше 3-х символів'>
            </p>
            <button class="add-case__btn">&#43;</button>
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
            this.btn = document.querySelector('.add-case__btn');

            this.form.addEventListener('submit', (e) => {
                e.preventDefault();

                const contact = {};

                this.inputs.forEach((inp) => {
                    contact[inp.name] = inp.value;
                });
                
                for (let item in contact) { 
                    while (this.validation(contact[item])) {
                        this.form.reset();
                        alert('Заповніть всі поля');
                        document.querySelector('.time-input').onfocus();
                    }
                }
                
                config.onFormSubmit && config.onFormSubmit(contact);
                this.form.reset();
            })
        })
    }

    validation(val) {
        return val === null || val === '' || 3 > val.length;
    }   
}
