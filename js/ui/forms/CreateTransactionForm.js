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
        const selectIncome = document.querySelector('#income-accounts-list');        
        const selectExpense = document.querySelector('#expense-accounts-list');
        if(!selectIncome.innerHTML) {
          selectIncome.innerHTML = html;
        } else if(!selectExpense.innerHTML) {
          selectExpense.innerHTML = html;
        }
      } else {
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
