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
