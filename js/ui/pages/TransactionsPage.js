/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if( element == null ) {
      throw new Error('Невозможно добавить пустой элемент в конструктор')
    }
      this.element = element;
      this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render( this.lastOptions );
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if( event.target.classList.contains('remove-account') ){
        this.removeAccount();
      } else if( event.target.classList.contains('transaction__remove') ) {
        this.removeTransaction(event.target.dataset.id);
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if(!this.lastOptions) {
      return null;
    } else 
    if(confirm('Вы действительно хотите удалить счёт?')) {
      const currentAccount = document.querySelector('.accounts-panel .active'); // Добываем id счёта
      const data = User.current();
      Account.remove(currentAccount.dataset.id, data, (err, response) => {
        if(response.success) {
          console.log('Account.remove response:')
          console.log(response);
          App.update();
        } else if (response.success === false) {
          console.log(response.error);
        } else {
          console.log(err);
        };
      });
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if(confirm('Вы действительно хотите удалить эту транзакцию?')) {
      const data = User.current();
      Transaction.remove(id, data, (err, response) => {
        if(response.success) {
          console.log(response);
          App.update();
        } else if (response.success === false) {
          console.log(response.error);
        } else {
          console.log(err);
        };
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) { 
    if(!options) {
      return null;
    }
    this.lastOptions = options;
    const data = User.current();
    Account.get(options, data, (err, response) => {
      if(response.success) {
        console.log(response);
        this.renderTitle(response.data);
      } else if (response.success === false) {
        console.log(response.error);
      } else {
        console.log('Account.get false because options.account_id пустой')
        console.log(response);
        console.log(err);
      };
    });
    Transaction.list(options, (err, response) => {
      if(response.success) {
        console.log(response);
        this.renderTransactions(response.data);
      } else if (response.success === false) {
        console.log(response.error);
      } else {
        console.log('Transaction.list false because')
        console.log(response);
        console.log(err);
      };
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    const headerTitle = document.querySelector('.content-header .content-title');
    headerTitle.textContent = 'Название счёта';
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    const headerTitle = document.querySelector('.content-header .content-title');
    headerTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    const formattedDate = new Date(date.replace(' ', 'T'));
    const month = formattedDate.toLocaleString('ru', { month: 'long' });
    const result = `${formattedDate.getDate()} ${month} ${formattedDate.getFullYear()} г. в ${formattedDate.getHours()}:${formattedDate.getMinutes()}`;
    console.log(`formatDate: ${result}`);
    return result;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    let classHTML = null;
    if(item.type === 'expense') {
      classHTML = 'transaction_expense';
    } else if(item.type === 'income') {
      classHTML = 'transaction_income';
    }
    return `
    <div class="transaction ${classHTML} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${id.name}</h4>
            <div class="transaction__date">${formatDate(item.date)}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
        <!--  сумма -->
            ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>  
          </button>
      </div>
  </div>
  `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    let html = '';
    data.forEach(element => {
      html += getTransactionHTML(element);
    });
    const content = document.querySelector('.content-wrapper .content');
    content.innerHTML = html;
  }
}
