/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem( 'user', JSON.stringify(user) );
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.clear();
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
      return localStorage.user && JSON.parse( localStorage.getItem('user') );
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    const request = {
      url: this.HOST + this.URL + '/current',
      method: 'GET',
      data,
      callback: ( err, response ) => {
        if( response && response.user ) {
          User.setCurrent( response.user );
        } else if( !response.success ) {
          User.unsetCurrent();
        }
        callback( err, response );
      },
    }
    return createRequest(request);
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    const request = {
      url: this.HOST + this.URL + '/login',
      method: 'POST',
      data,
      callback: ( err, response ) => {
        if ( response && response.user ) {
          User.setCurrent( response.user );
        }
        callback( err, response );
      },
    }
    return createRequest(request);
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    const request = {
      url: this.HOST + this.URL + '/register',
      method: 'POST',
      data,
      callback: ( err, response ) => {
        if ( response && response.user ) {
          User.setCurrent( response.user );
        }
        callback( err, response );
      },
    }
    return createRequest(request);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    const request = {
      url: this.HOST + this.URL + '/register',
      method: 'POST',
      data,
      callback: ( err, response ) => {
        if ( response.success ) {
          User.unsetCurrent();
        }
        callback( err, response );
      },
    }
    createRequest(request);
  }
}

User.HOST = Entity.HOST;
User.URL = '/user';