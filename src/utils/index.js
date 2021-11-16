export function isArray(info) {
  return Object.prototype.toString.apply(info) === '[object Array]'
}
export function isObject(info) {
  return Object.prototype.toString.apply(info) === '[object Object]'
}

export function getStorage(name, { isJson = false, defaultValue = '' } = {}) {
  const content = localStorage.getItem(name) || defaultValue
  return isJson ? JSON.parse(content) : content
}

export function setStorage(name, content) {
  const res = (isArray(content) || isObject(content))
    ? JSON.stringify(content)
    : content
  localStorage.setItem(name, res)
}

