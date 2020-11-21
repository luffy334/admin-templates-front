import Cookies from 'js-cookie'

const TokenKey = 'admin_template_token'
const MenuKey = 'admin_template_menu'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getMenu() {
  return Cookies.get(MenuKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setMenu(menu) {
  return Cookies.set(MenuKey, menu)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeMenu() {
  return Cookies.remove(MenuKey)
}
