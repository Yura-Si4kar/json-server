export default class ShoppingListView {
    static list_template = `<div>
        <h2 class="shoping-title">Покупки на сьогодні: </h2>
        <button type="button" class="case-shoping_btn">Очистити</button>
        <ol class="shoping-list"></ol>
    </div>`;
    
    static shoppingItem = `<li class="list-item" data-id="{{id}}">
        <input type="checkbox" class='checkbox' {{checked}}>
        <span class='buy-item {{done}}'>{{buy}}</span>
    </li>`;
    
    static createShoppingElement(item) {
        return ShoppingListView.shoppingItem.replace('{{id}}', item.id)
                    .replace('{{checked}}', item.checked ? 'checked' : '')
                    .replace('{{buy}}', item.buy)
                    .replace('{{done}}', item.done ? 'done' : '');
    }

    constructor(config = {}) {
        this.el = ShoppingListView.list_template;
        this.init(config);
    }

    init(config) {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('checkbox')) {
                config.checkedItem && config.checkedItem(e.target.closest('.list-item').dataset.id);
            } else if (e.target.classList.contains('case-shoping_btn')) {
                config.onClearListBtnClick && config.onClearListBtnClick();
            }
        })
    }    
    
    renderShoppingList(list) {
        this.listBlock = document.querySelector('.shoping-list');
        this.listBlock.innerHTML = list.map(ShoppingListView.createShoppingElement).join('\n');
    }
}
