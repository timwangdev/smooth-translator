<template>
  <div id="cst-list" class="cst-list">
    <result-toast
      v-for="result in results"
      :result="result"
      :key="result.text"
      @close="removeResult(result.text)">
    </result-toast>
  </div><!-- .board -->
</template>

<script>
import _ from 'lodash';
import OptionsLoader from '../mixins/options-loader';
import ResultToast from './ResultToast.vue';

export default {
  mixins: [OptionsLoader],
  data() {
    return {
      results: [],
    };
  },
  methods: {
    translate(text) {
      if (this.findIndex(text) == -1) {
        this.results.push({
          text: text,
          status: 'pending',
          show: true
        });
      }
    },
    removeResult(text) {
      this.results.splice(this.findIndex(text), 1);
    },
    findIndex(text) {
      return _.findIndex(this.results, { text });
    }
  },
  components: {
    ResultToast,
  },
};
</script>
