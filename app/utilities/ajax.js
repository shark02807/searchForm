import axios from 'axios';
import Cookies from 'js-cookie';
import Cache from 'Utilities/cache';

import constants from 'Utilities/constants';

const csrfHeaderName = 'DENT-Csrf-token';

const addStandartHeaders = inOptions => {
  const options = inOptions;

  const isMultipart = options.headers['Content-Type'] === 'multipart/form-data';

  options.headers.Accept = 'application/json';

  if (!isMultipart && !options.noTransform) {
    if (options.method && options.method.toLowerCase() === 'post') {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    }

    if (!options.transformRequest) options.transformRequest = [];
    options.transformRequest.push(data => (data && Object.keys(data).map(p => (`${encodeURIComponent(p)}=${encodeURIComponent(data[p])}`)).join('&')));
  }

  if (options.transformResponse) {
    options.transformResponse = axios.defaults.transformResponse.concat(options.transformResponse);
  }

  return options;
};

const addLocalRequestHeaders = inOptions => {
  const options = inOptions;
  if (!options.headers) options.headers = {};
  options.headers[csrfHeaderName] = Cookies.get(constants.get('csrfCookieName'));
  return addStandartHeaders(options);
};

const addHybrisGoRequestHeaders = inOptions => {
  const options = inOptions;
  const AuthorizationCookies = Cookies.get(constants.get('accessTokenCookieName'));
  if (!options.data && options.method === 'POST') options.data = {};
  if (!options.headers) options.headers = {};
  if (AuthorizationCookies) options.headers.Authorization = `Bearer ${AuthorizationCookies}`;
  options.headers[csrfHeaderName] = Cookies.get(constants.get('csrfCookieName'));
  if (!options.headers['Content-Type']) options.headers['Content-Type'] = 'application/json; charset=utf-8';
  options.withCredentials = true;
  if (!options.params) options.params = {};
  options.params.lang = constants.get('myaccount').language;
  return addStandartHeaders(options);
};

const addCorsRequestHeaders = inOptions => {
  const options = inOptions;
  if (!options.headers) options.headers = {};
  options.headers.Authorization = `Bearer ${Cookies.get(constants.get('accessTokenCookieName'))}`;
  options.withCredentials = true;
  if (!options.params) options.params = {};
  options.params.lang = constants.get('language');
  return addStandartHeaders(options);
};

const getSessionCache = () => Cache.get('sessionRequestCache') || {};

const sessionCachedRequest = (func, options) => {
  const key = `${options.url}:${JSON.stringify(options)}`;
  let sessionCache = getSessionCache();
  if (sessionCache[key]) {
    return new Promise(resolve => resolve(sessionCache[key]));
  }

  const fetchFunc = func(options);

  fetchFunc.then(data => {
    sessionCache = {
      ...getSessionCache(),
    [key]: data
  };
  Cache.set('sessionRequestCache', sessionCache);
});

  return fetchFunc;
};

export const ajax = settings => {
  if (!settings || !settings.url) return console.error('ERROR: empty url for http request!');
  return axios(addLocalRequestHeaders(settings));
};

export const hybrisGo = ({ cachePerSession, ...settings }) => {
  if (!settings || !settings.url) return console.error('ERROR: empty url for http request!');
  if (cachePerSession) return sessionCachedRequest(axios, addHybrisGoRequestHeaders(settings));
  return axios(addHybrisGoRequestHeaders(settings));
};

export const cors = settings => {
  if (!settings || !settings.url) return console.error('ERROR: empty url for http request!');
  return axios(addCorsRequestHeaders(settings));
};

// JUST FOR DEVELOPMENT, SHOULD BE REMOVED IN FUTURE
export const mock = settings => {
  if (!settings || !settings.url) return console.error('ERROR: empty url for http request!');
  let responseData = settings.url;
  return new Promise(resolve => {
    setTimeout(() => {
    if (settings.transformResponse) {
      responseData = [].concat(settings.transformResponse)[0](responseData);
    }
    resolve({ data: responseData });
  }, 100);
});
};
