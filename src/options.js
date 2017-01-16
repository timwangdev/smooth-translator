import Vue from 'vue';
import OptionsApp from './components/options-app.vue';
import FormControl from './components/form-control.vue';

Vue.component('form-control', FormControl);

new Vue({
  el: '#app',
  render: h => h(OptionsApp),
});
