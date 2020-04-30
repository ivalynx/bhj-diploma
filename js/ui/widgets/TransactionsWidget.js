/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if( element == null ) {
      throw new Error('Невозможно добавить пустой элемент в конструктор')
    }
      this.element = element;
      this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const widget = document.querySelector('.transactions-panel');
    widget.addEventListener('click', event => {
      if( event.target.classList.contains('create-income-button') ) {
        App.getModal('newIncome').open();
      } else if( event.target.classList.contains('create-expense-button') ) {
        App.getModal('newExpense').open();
      }
    });
  }
}
