/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  constructor() {
    this.HOST = Entity.HOST;
    this.URL = '/user';
  };
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    userStringlify = JSON.stringify(user);
    localStorage.setItem('user', userStringlify);
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
    try {
      return JSON.parse( localStorage.getItem('user') );
    } catch (error) {
      return undefined;
    }
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
      callback( err, response ) {
        if ( response && response.user ) {
          User.setCurrent( response.user );
        }
        callback( err, response );
      },
    }    
    try {
      const response = JSON.parse( createRequest(request) ) ;      
      if( !response.success ) {
        User.unsetCurrent();
      }
    } catch (error) {
      return null;
    }
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
      callback( err, response ) {
        if ( response && response.user ) {
          User.setCurrent( response.user );
        }
        callback( err, response );
      },
    }
    createRequest(request);
    // try {      не уверена, что нужна эта конструкция в свете того, что метод был вызвал в коллбеке
    //   const response = JSON.parse( createRequest(request) ) ;      
    //   if( response.success ) {
    //     this.setCurrent(response.user);
    //   } 
    // } catch (error) {
    //   return null;
    // }

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
      callback( err, response ) {
        if ( response && response.user ) {
          User.setCurrent( response.user );
        }
        callback( err, response );
      },
    }
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
      callback( err, response ) {
        if ( response ) {
          User.unsetCurrent();
        }
        callback( err, response );
      },
    }
    createRequest(request);
  }
}
