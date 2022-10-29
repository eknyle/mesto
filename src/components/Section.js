export default class Section {
  constructor({ items, renderer }, container) {
    //Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
    // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
    this._items = items;
    this._renderer = renderer;
    this._elementsContainer = container; //селектор контейнера, в который нужно добавлять созданные элементы
  }
  generateItems() {
    //отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
    for (let i = 0; i < this._items.length; i++) {
      const card = this._renderer(this._items[i]);
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
