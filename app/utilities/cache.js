export default {
  set: (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
},
get: key => JSON.parse(localStorage.getItem(key)),
  remove: key => {
  localStorage.removeItem(key);
},
setSession: (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
},
getSession: key => JSON.parse(sessionStorage.getItem(key)),
  removeSession: key => {
  sessionStorage.removeItem(key);
}
};
