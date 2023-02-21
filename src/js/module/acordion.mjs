export default function acordion() {
  let tabs = document.getElementsByClassName("list-btn");

  [...tabs].forEach((tab) => tab.addEventListener('click', () => {
    tab.classList.toggle('active');
    let panel = tab.nextElementSibling;
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
  }));
}