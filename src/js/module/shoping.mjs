export default function shoping() {
    const STORAGE_KEY = 'shoppingList';
    const LIST_ITEM_CLASS = 'list-item';
    const addBtn = document.querySelector('.add-item');
    const itemName = document.querySelector('.shopping-input');
    const shoppingListBox = document.querySelector('.shoping-list');
    const clearBtn = document.querySelector('.case-shoping_btn');
    const shoppingForm = document.querySelector('#shopping-form');

    shoppingForm.addEventListener('submit', addItem);
    document.addEventListener('click', addToShoppingList);
    addBtn.addEventListener('click', addItem);
    clearBtn.addEventListener('click', clearList);
    // Ініціалізуємо массив покупок
    let shoppingList = [];
    
    init();    
    // Присвоюємо дані з localStorage масивові і рендеримо їх
    function init() {
        shoppingList = restoreData();
        renderList();
    }
    // Додаємо нашу покупку в HTML, очищаємо input,
    // зберігаємо дані і рендеримо список з новим елементом
    function addItem(e) {
        const innerBlock = document.querySelector('.shoping-list');
        let newItem = createItem();

        innerBlock.insertAdjacentHTML('beforeend', generateItemHTML(newItem));

        e.preventDefault();
        clearString();
        saveData();
        renderList();
    }
    // Створюємо об'єкт, пушимо його в масив, та повертаємо об'єкт
    function createItem() {
        let item = {
            id: Date.now(),
            buy: getItemValue(),
            done: false,
            checked: false,
        };

        shoppingList.push(item);
        
        return item;
    }
    // Генеруємо HTML елемент
    function generateItemHTML(item) {
        const template = document.querySelector('.shopping-template').innerHTML;

        return template.replace('{{id}}', item.id)
            .replace('{{checked}}', item.checked ? 'checked' : '')
            .replace('{{buy}}', item.buy)
            .replace('{{done}}', item.done ? 'done' : '')
    }
    // Отримуємо значення input, назва покупки...
    function getItemValue() {
        return itemName.value;
    }
    // По клікові на checkbox додаємо стилі виконаної покупки
    function addToShoppingList(e) {        
        if (e.target.classList.contains('checkbox')) {
            let id = getItemId(e);
            buyItem(id);
        }
    }
    // Знаходимо елемент по якому був збійснений клік,змінюжмо стилі, зберігаємо та рендеримо
    function buyItem(id) {
        let item = shoppingList.find((el) => el.id == id);
        item.done = !item.done;
        item.checked = !item.checked;
        saveData();
        renderList();
    }
    // Очищаємо localStorage берем з нього нові дані та рендеримо список
    function clearList() {
        deleteData();
        shoppingList = restoreData();
        renderList();
    }
    // Функція очистки input
    function clearString() {
        itemName.value = '';
    }
    // Повертає значення id
    function getItemId(e) {
        return +e.target.closest('.' + LIST_ITEM_CLASS).dataset.id;
    }
    // Зберегаємо дані в localStorage
    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(shoppingList));
    }
    // Отримуємо дані з localStorage
    function restoreData() {
        let data = localStorage.getItem(STORAGE_KEY);

        return data ? JSON.parse(data) : [];
    }
    // Функція очистки localStorage
    function deleteData() {
        localStorage.clear();
    }
    // Функція рендеру списка
    function renderList() {
        shoppingListBox.innerHTML = shoppingList.map(generateItemHTML).join('\n');
    }
}