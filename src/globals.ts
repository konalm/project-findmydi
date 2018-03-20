let apiUrl = '';


switch (window.location.hostname) {
  case 'localhost':
    apiUrl = 'http://localhost:8181/';
    break;
  case 'staging.app.findmydi.com':
    apiUrl = 'http://staging.app.findmydi.com';
    break;
}

/**
 * return the api url 
 */
export const getApiUrl = function () {
    return apiUrl
}

