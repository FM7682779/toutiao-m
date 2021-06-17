export const getStorage = (name) => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export const setStorage = (name, value) => {
  try {
    const data = JSON.stringify(value)
    window.localStorage.setItem(name, data)
  } catch (error) {
    window.localStorage.setItem(name, value)
  }
}

export const removeStorage = (name) => {
  window.localStorage.removeItem(name)
}