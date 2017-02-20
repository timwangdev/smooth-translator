import Vue from 'vue';
import VueAutosize from 'vue-autosize';
import Icon from 'vue-icon';
import PopupApp from './components/PopupApp.vue';

Vue.component('icon', Icon);
Vue.use(VueAutosize);

new Vue({
  el: '#app',
  render: h => h(PopupApp),
});
