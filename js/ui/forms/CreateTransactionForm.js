/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {    
    Account.list(User.current(), (err, response) => {
      if(response.success) {
        let html = '';
        for(let i = 0; i < response.data.length; i++) {
          html += `<option value="${response.data[i].id}">${response.data[i].name}</option>`;
        }
        const accoutSelect = this.element.querySelector('.accounts-select');
        accoutSelect.innerHTML = html;
      } else if (response.success === false) {
        console.log(response.error);
      } else {
        console.log(response)
        console.log(err);
      };
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, (err, response) => {
      if(response) {
        App.update();
        this.element.reset();
        if(this.element.id === 'new-income-form') {
          App.getModal('newIncome').close();
        } else if(this.element.id === 'new-expense-form') {
          App.getModal('newExpense').close();
        }        
      } else {
        console.log(err);
      }
    });
  }
}
