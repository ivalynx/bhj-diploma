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
    console.log(options);
    User.register(options, (err, response) => {
      if(response) {
        let formData = new FormData(document.getElementById(this.element.id));
        for (let entry of formData.entries()) {
          formData.delete(entry[0]);
        };
        App.setState( 'user-logged' );
        const modal = this.element.closest('.modal');
        modal.close();
      } else {
        console.log(err);
      }
    });  
  }
}
