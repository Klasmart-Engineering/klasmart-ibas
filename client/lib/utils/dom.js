// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 }
const loaded = []

const scrollToId = (id) =>
  document && document.getElementById(id).scrollIntoView({ behavior: 'smooth', center: 'center' })

const getFromLocalStorage = (key) => {
  if (process && process.browser && document) {
    if (window && window.localStorage && {}.hasOwnProperty.call(window.localStorage, key)) {
      const property = window.localStorage.getItem(key)
      if (property) return JSON.parse(property)
    }
  }

  return undefined
}

const setLocalStorageItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn('Could not save data to localStorage.')
  }
}

const removeLocalStorageItem = (key) => {
  if ({}.hasOwnProperty.call(window.localStorage, key)) {
    window.localStorage.removeItem(key)
  }
}

const loadScript = (url, callback) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  if (script.readyState) {
    //IE
    script.onreadystatechange = () => {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null
        loaded.push(url)
        callback()
      }
    }
  } else {
    //Others
    script.onload = () => {
      loaded.push(url)
      callback()
    }
  }

  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
}

const checkLoaded = (url) => {
  return loaded.includes(url)
}

const preventDefault = (e) => {
  e = e || window.event
  if (e.preventDefault) e.preventDefault()
  e.returnValue = false
}

const preventDefaultForScrollKeys = (e) => {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

const disableScroll = () => {
  if (process && process.browser && document) {
    document.getElementsByTagName('body')[0].style['overflow'] = 'hidden'
  }
}

const enableScroll = () => {
  if (process && process.browser && document) {
    document.getElementsByTagName('body')[0].style['overflow'] = 'auto'
  }
}

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('service worker registration successful')
      })
      .catch((err) => {
        console.warn('service worker registration failed', err.message)
      })
  }
}

module.exports = {
  scrollToId,
  getFromLocalStorage,
  setLocalStorageItem,
  removeLocalStorageItem,
  loadScript,
  enableScroll,
  disableScroll,
  preventDefault,
  checkLoaded,
  registerServiceWorker,
}
