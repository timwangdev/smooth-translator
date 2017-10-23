import 'chromereload/devonly'
import Vue from 'vue'
import Icon from 'vue-icon'
import PopupApp from './components/PopupApp.vue'

Vue.component('icon', Icon)

new Vue({
  el: '#app',
  render: h => h(PopupApp),
})
