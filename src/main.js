import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from "./utils/request"
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/style.css'
import { Button, Form, FormItem, Input, Select, Aside, Header, Main, Menu, MenuItem, Submenu, Container, MenuItemGroup,
  DropdownMenu, Dropdown, DropdownItem, Popover, Tag, Table, TableColumn, Option, Pagination, Dialog, Loading, Message } from 'element-ui';

Vue.config.productionTip = false
Vue.use(Button).use(Form).use(FormItem).use(Input).use(Select).use(Aside).use(Header).use(Main).use(Menu).use(MenuItem)
    .use(Submenu).use(Container).use(MenuItemGroup).use(DropdownMenu).use(Dropdown).use(DropdownItem)
    .use(Popover).use(Tag).use(Table).use(TableColumn).use(Option).use(Pagination).use(Dialog).use(Loading)

Vue.prototype.$store = store
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
