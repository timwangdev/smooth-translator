<template>
  <transition name="fade" @after-leave="close">
    <div class="result-toast" v-if="result.show">
      <a href="javascript:;" class="close" @click="hide">&times;</a>
      <result :result="result"></result>
    </div>
  </transition>
</template>

<script>
import { clearSelection } from '../helpers/selection';
import Result from './Result.vue';

export default {
  props: ['result'],
  created() {
    this.translate();
  },
  methods: {
    translate() {
      const message = { type: 'translate', text: this.result.text };
      chrome.runtime.sendMessage(message, (result) => {
        this.result = Object.assign(this.result, result);
      });
    },
    hide() {
      clearSelection();
      this.result.show = false;
    },
    close() {
      this.$emit('close');
    }
  },
  components: {
    Result
  },
};
</script>

<style lang="scss">
@import '../scss/fade';

.result-toast {
  @include fade;

  z-index: 2147483647;
  max-width: 250px;
  min-width: 150px;
  line-height: 1.5;
  font-size: 14px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #000000;
  opacity: 0.9;
  transition: top 1s;

  a.close {
    float: right;
    text-decoration: none;
    margin-right: 5px;
    font-size: .8em;
    color: #cecece;

    &:hover {
      color: #ffffff;
    }
  }
}
</style>