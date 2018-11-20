import lessVars from '!less-to-json-loader!./../../less/common/variables.less';

export const getMediaQueries = () => ({
  small: +lessVars['screen-sm-size'],
  medium: +lessVars['screen-md-size'],
  large: +lessVars['screen-lg-size']
});

export const isValidArray = array => Array.isArray(array) && !!array.length;

export const checkPlatform = () => {
  const platformData = {
    android: /Android/i.test(navigator.userAgent),
    ios: /iPhone|iPad|iPod/i.test(navigator.userAgent),
    iPhone: /iPhone/i.test(navigator.userAgent),
    iPad: /iPad/i.test(navigator.userAgent)
  };
  platformData.isMobile = platformData.android || platformData.ios;

  return platformData;
};

export const wrapFunc = func => (...args) => func(...args).then(response =>
({ response })).catch(error => ({ error: error && (error.response || error) }));

export const keyMirror = (name, keys) => {
  const mirror = {};
  Object.keys(keys).forEach(v => { mirror[v] = `${name}__${v}`; });
  return mirror;
};

export const getUrlParams = () => {
  const params = {};
  const paramsArr = window.location.search.substring(1).split('&');
  paramsArr.forEach(paramsItem => {
    const [paramName, paramValue] = paramsItem.split('=');
  params[paramName] = paramValue;
});
  return params;
};

export const getHashParams = () => {
  const params = {};
  const paramsArr = window.location.hash.substring(1).split('&');
  paramsArr.forEach(paramsItem => {
    const [paramName, paramValue] = paramsItem.split('=');
  params[paramName] = paramValue;
});
  return params;
};

export const redirect = url => {
  if (!url || !window) return;
  window.location.href = url;
};

export const getJoinUrl = (isNewUser, uid, { loginUrl, registrationUrl, resourcePath }) => {
  const redirectUrl = `${window.location.origin}${window.location.pathname}`;
  return `${isNewUser ? registrationUrl : loginUrl}?account=${uid}&redirectUrl=${redirectUrl}&resourcePath=${resourcePath}`;
};
