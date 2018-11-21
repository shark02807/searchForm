export const keyMirror = (name, keys) => {
  const mirror = {};
  Object.keys(keys).forEach(v => { mirror[v] = `${name}__${v}`; });
  return mirror;
};