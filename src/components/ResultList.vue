<template>
  <div id="cgt-list">
    <result-toast
      v-for="result in results"
      :result="result">
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
      const existed = _.some(this.results, { text });

      if (!existed) {
        this.results.push({
          text: text,
          status: 'pending',
        });
      }
    },
  },
  components: {
    ResultToast,
  },
};
</script>

<style lang="scss">
#cgt-list {
  background: transparent;
  position: fixed;
  margin: 0;
  padding: 0;
  z-index: 2147483647;
  width: 250px;
  right: 15px;
  top: 35px;
  text-align: left;
  overflow: auto;
  max-height: calc(100% - 40px);

  &::-webkit-scrollbar {
    display: none;
    width: 0px;
  }

  .transit-list-inner {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
