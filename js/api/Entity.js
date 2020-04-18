/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    const request = {
      url: this.HOST + this.URL,
      method: 'GET',
      data,
      callback,
    }
    try {
      return JSON.parse( createRequest(request) ) ;
    } catch (error) {
      return null;
    }
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    const request = {
      url: this.HOST + this.URL,
      method: 'POST',
      data: Object.assign({ _method: 'PUT' }, data ),
      callback,
    };
    try {
      return JSON.parse( createRequest(request) ) ;
    } catch (error) {
      return null;
    }
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {    
    const request = {
      url: this.HOST + this.URL,
      method: 'GET',
      data: Object.assign({}, data ),
      callback,
    };
    request.data.id = id; 
    try {
      return JSON.parse( createRequest(request) ) ;
    } catch (error) {
      return null;
    }
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {    
    const request = {
      url: this.HOST + this.URL,
      method: 'POST',      
      data: Object.assign({ _method: 'DELETE' }, data ),
      callback,
    };
    request.data.id = id;
    try {
      return JSON.parse( createRequest(request) ) ;
    } catch (error) {
      return null;
    }
  }
}

Entity.URL = '';
Entity.HOST = 'https://bhj-diplom.letsdocode.ru';