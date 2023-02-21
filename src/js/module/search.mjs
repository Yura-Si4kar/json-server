export default function search(val) {
    const searchInput = document.querySelector('#search-input');
    const searchResultBlock = document.querySelector('.search-result');

    let searchList = val;
    
    document.addEventListener('input', showValue);
    console.log(searchList);
    function showValue() {
        let input = getInputValue();
        searchList.forEach(element => {
            console.log(input.length);
            if (element.title.toLowerCase().match(input)) {
                searchResultBlock.innerHTML = `${element.title} о ${element.time}, ${new Date(element.date).toLocaleDateString()}`;
            }
            if (input.length < 1) {
                searchResultBlock.innerHTML = '';
            }
        });
    }
    
    function getInputValue() {
        return searchInput.value;
    }
}