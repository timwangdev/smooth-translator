<template>
  <div class="result" :class="[theme, result.status]" v-if="result">
    <h6 class="text" v-if="result.text">{{ result.text }}</h6>
    <pre class="phonetic" v-if="result.phonetic">{{ result.phonetic }}</pre>
    <div class="translation" v-html="result.translation"></div>
  </div>
</template>

<script>
export default {
  props: ['result', 'theme']
};
</script>

<style lang="scss">
.result {
  padding: 3px 5px;

  .phonetic {
    margin-top: 0;
    margin-bottom: 5px;
  }

  h6, code, pre {
    border: none;
    background: none;
    color: inherit;
    padding: 0;
    margin: 0;
    text-transform: none;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
  }

  .text {
    margin-bottom: 5px;
    font-weight: 600;
  }
}

.result.dark {
  &.success,
  &.pending {
    background: #336721;
    color: #EDF8ED;
  }

  &.failure {
    background: #FFF299;
    color: #888888;
  }
}

.result.light {
  &.success,
  &.pending {
    background: #DDEADD;
    color: #2B3F29;
  }

  &.failure {
    background: #fff3c8;
    color: #888888;
  }
}
</style>
