<template>
  <div class="cst-result" :data-cst-theme="theme" :data-cst-status="result.status" v-if="result">
    <h6 class="cst-result-text" v-if="result.text">{{ result.text }}</h6>
    <pre class="cst-result-phonetic" v-if="result.phonetic">{{ result.phonetic }}</pre>
    <div class="cst-result-translation" v-html="result.translation"></div>
  </div>
</template>

<script>
export default {
  props: ['result', 'theme']
}
</script>
