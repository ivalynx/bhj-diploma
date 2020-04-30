/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if( element == null ) {
      throw new Error('Невозможно добавить пустой элемент в конструктор UserWidget')
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const accountsPanel = document.querySelector('.accounts-panel');
    accountsPanel.addEventListener('click', (event) => {
      if( event.target.classList.contains('create-account') ) {
        App.getModal('createAccount').open();
      } else if( event.target.closest('.account') ) {
        this.onSelectAccount(event.target);
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const data = User.current();
    if(data) {
      Account.list(data, (err, response) => {
        if(response.success) {
          this.clear();
          this.renderItem(response.data);
        } else {
          console.log(err)
        };
      });
    }

  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = document.querySelectorAll('.accounts-panel .account');
    for(const account of accounts) {
      account.remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    document.querySelector('.accounts-panel .account.active').classList.remove('active');
    element.closest('.account').classList.add('active');
    App.showPage( 'transactions', { account_id: element.id } );
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    let result = '';
    for(let i = 0; i < item.length; i++) {
      if(i===0){
        result += `<li class="account active" data-id="${item[i].id}">
          <a href="#">
            <span>${item[i].name}</span> /
            <span>${item[i].sum}</span>
          </a>
        </li>`;
      } else {
        result += `<li class="account" data-id="${item[i].id}">
          <a href="#">
            <span>${item[i].name}</span> /
            <span>${item[i].sum}</span>
          </a>
        </li>`;
      }
    }
    return result;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    const html = this.getAccountHTML(item);
    const accountsPanel = document.querySelector('.accounts-panel');
    accountsPanel.insertAdjacentHTML('beforeEnd', html);
  }
}
