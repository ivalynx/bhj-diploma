/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.register(options, (err, response) => {
      if(response.success) {
        console.log(response);
        this.element.reset();
        App.setState( 'user-logged' );
        App.getModal('register').close();
      } else if (response.success === false) {
        console.log(response.error);
      } else {
        console.log(err);
      }
    });  
  }
}
