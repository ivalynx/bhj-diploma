/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.login(options, (err, response) => {
      if(response) {
        let formData = new FormData(myForm);
        for (let entry of formData.entries()) {
          formData.delete(entry[0]);
        };
        App.setState( 'user-logged' );
      } else {
        console.log(err);
      }
    });  
    this.element.closest('.modal').close();
  }
}
