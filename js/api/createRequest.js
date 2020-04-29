/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  let url = options.url;

  if( options.method != 'GET' ) {
    formData = new FormData;
    for (let [key, value] of Object.entries(options.data)) {
      formData.append( `${key}`, value );
    };
  } else {
    url += '?';
    for ( let [key, value] of Object.entries(options.data || {}) ) {
      url += `${key}=${value}&`;
    };
  };
  
  try {    
    xhr.open( options.method, url);
    if(options.headers) {
      for ( let [key, value] of Object.entries(options.headers) ) {
        xhr.setRequestHeader(`${key}`, value);
      };
    }    
    xhr.withCredentials = true;
    xhr.responseType = 'json'; 
    if (options.method === 'GET') {
        xhr.send();
    } else {
        xhr.send(formData);
    }
  }
  catch (err) {
    // перехват сетевой ошибки
    options.callback(err);
  }

// В случае успешного выполнения кода, необходимо вызвать функцию, заданную в callback и передать туда данные:
  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      options.callback(null, xhr.response);
    }
  };
  return xhr;
};