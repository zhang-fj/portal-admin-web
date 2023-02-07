import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'

// font-awesome 图标库
import 'font-awesome/css/font-awesome.css'

// 数据字典
import dict from './components/Dict'

// 权限指令
import checkPer from '@/utils/permission'
import permission from './components/Permission'
import './assets/styles/element-variables.scss'

// global css
import './assets/styles/index.scss'

// 代码高亮
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'

import App from './App'
import store from './store'
import router from './router/routers'

import './assets/icons' // icon
import './router/index' // permission control
import 'echarts-gl'
import UUID from 'vue-uuid' // uuid

import TEditor from '@/components/tinymce2/TEditor.vue'
Vue.component('TinymceEditor', TEditor)

Vue.use(checkPer)
Vue.use(VueHighlightJS)
Vue.use(permission)
Vue.use(dict)
Vue.use(UUID)
Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
