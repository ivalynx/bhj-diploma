/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    Account.create(options, (err, response) => {
      if(response) {
        let formData = new FormData(myForm);
        for (let entry of formData.entries()) {
          formData.delete(entry[0]);
        };
        App.update();
        this.element.closest('.modal').close();
      } else {
        console.log(err);
      }
    });  

  }
}
