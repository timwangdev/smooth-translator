<template>
  <div class="result" :class="result.status" v-if="result">
    <h6 class="text" v-if="result.text">{{ result.text }}</h6>
    <pre class="phonetic" v-if="result.phonetic">{{ result.phonetic }}</pre>
    <div class="translation" v-html="result.translation"></div>
  </div>
</template>

<script>
export default {
  props: ['result']
};
</script>

<style lang="scss">
.result {
  &.success,
  &.pending {
    background: #336721;
    padding: 3px 6px;
    margin: 0;
    color: #EDF8ED;
  }

  &.failure {
    background: #FFF8DC;
    padding: 3px 6px;
    margin: 0;
    color: #888888;
  }

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
</style>