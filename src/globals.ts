let apiUrl = '';


switch (window.location.hostname) {
  case 'localhost':
    apiUrl = 'http://localhost:8181/';
    break;
  case 'staging.app.findmydi.com':
    apiUrl = 'http://staging.api.findmydi.com/';
    break;
  case 'app.findmydi.com':
    apiUrl = 'http://api.findmydi.com/';
    break;
}

/**
 * return the api url 
 */
export const getApiUrl = function () {
    console.log('api url --->')
    console.log(apiUrl)
    
    return apiUrl
}

