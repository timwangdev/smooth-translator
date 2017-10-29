<template>
  <transition name="fade" @after-leave="close">
    <div class="result-toast" v-if="result.show">
      <a href="javascript:;" class="close" @click="hide">&times;</a>
      <result :result="result" theme="dark"></result>
    </div>
  </transition>
</template>

<script>
import { clearSelection } from '../helpers/selection';
import Result from './Result.vue';

export default {
  props: ['result'],
  data() {
    return {
      timer: null
    };
  },
  created() {
    this.translate();
  },
  methods: {
    translate() {
      const message = {
        type: 'translate',
        text: this.result.text,
        from: 'page'
      };
      chrome.runtime.sendMessage(message, (result) => {
        this.result = Object.assign(this.result, result);
        this.timer = setTimeout(() => {
          this.result.show = false;
        }, this.result.timeout * 1000);
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

