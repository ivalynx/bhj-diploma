/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  let url = options.url;
  xhr.withCredentials = true;
  xhr.responseType = options.responseType;

  if( options.method != 'GET' ) {
    formData = new FormData;
    for (let [key, value] of Object.entries(options.data)) {
      formData.append( `${key}`, value );
    };
  } else {
    url += '?';
    for ( let [key, value] of Object.entries(options.data) ) {
      url += `${key}=${value}&`;
    };
  };

  xhr.open(options.method, `${options.url}`, true);

  if(options.headers) {
    for ( let [key, value] of Object.entries(options.headers) ) {
      xhr.setRequestHeader(`${key}`, value);
    };
  } 
  
  try {
    if (options.method === 'GET') {
        xhr.open( 'GET', url);
        xhr.send();
    } else {
        xhr.open( options.method, url);
        xhr.send(formData);
    }
  }
  catch (e) {
    // перехват сетевой ошибки
    options.callback(e);
  }

// В случае успешного выполнения кода, необходимо вызвать функцию, заданную в callback и передать туда данные:
  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      options.callback(null, xhr.responseText);
    }
  };
  console.log(xhr);
  return xhr;
};