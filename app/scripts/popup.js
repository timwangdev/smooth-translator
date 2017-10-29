import 'chromereload/devonly'
import 'vue-awesome/icons/cog'

import Vue from 'vue'
import Icon from 'vue-awesome/components/Icon'
import PopupApp from './components/PopupApp.vue'

Vue.component('icon', Icon)

new Vue({
  el: '#app',
  render: h => h(PopupApp),
})
