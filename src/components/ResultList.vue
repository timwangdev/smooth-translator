<template>
  <div id="cgt-list">
  </div><!-- .board -->
</template>

<script>
import OptionsLoader from '../mixins/options-loader';

export default {
  mixins: [OptionsLoader],
  data() {
    return {
      results: [],
    };
  },
};
</script>

<style lang="scss">
</style>
