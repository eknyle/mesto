export default class Section {
  constructor({ renderer }, container) {
    //Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
    // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
    this._renderer = renderer;
    this._elementsContainer = document.querySelector(container); //селектор контейнера, в который нужно добавлять созданные элементы
  }
  generateItems(items) {
    //отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
    for (let i = 0; i < items.length; i++) {
      const card = this._renderer(items[i]);
      this.addItem(card);
    }
  }
  addItem(element) {
    //принимает DOM-элемент и добавляет его в контейнер
    if (element) {
      this._elementsContainer.prepend(element);
    }
  }
}
