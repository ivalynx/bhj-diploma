/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    try {
      element != null;
      this.element = element;
      this.registerEvents();
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    this.onClose = this.onClose.bind( this );
    this.element.addEventListener('click', event => this.onClose(event));
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( event ) {
    const btn = event.target.closest('.close');
    if( btn && btn.hasAttribute('data-dismiss') ) {
      this.close();
      event.preventDefault();
    }
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    this.element.removeEventListener('click', event => this.onClose(event));
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.removeAttribute('style');
  }
}
