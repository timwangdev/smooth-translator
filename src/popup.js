import Vue from 'vue';
import VueAutosize from 'vue-autosize';
import PopupApp from './components/PopupApp.vue';

Vue.use(VueAutosize);

new Vue({
  el: '#app',
  render: h => h(PopupApp),
});
