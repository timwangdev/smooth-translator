<template>
  <div id="cst-list" class="cst-list">
    <result-toast
      v-for="result in results"
      :result="result"
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

<style lang="scss">
@import '../scss/reset';

.cst-list {
  @include reset;
}

#cst-list {
  position: fixed;
  z-index: 2147483647;
  width: 250px;
  right: 15px;
  top: 35px;
  max-height: calc(100% - 40px);
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
    width: 0px;
  }
}
</style>
