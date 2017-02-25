<template>
  <div class="gdt-result-toast">
    <a href="javascript:;" class="gdt-close">&times;</a>
    <result :result="result"></result>
  </div>
</template>

<script>
import Result from './Result.vue';

export default {
  props: ['result'],
  components: {
    Result,
  },
};
</script>

<style lang="scss">
.gdt-result-toast {
  z-index: 2147483647;
  max-width: 250px;
  min-width: 150px;
  line-height: 1.5;
  font-size: 14px;
  margin-bottom: 5px;
  text-align: left;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #000000;
  opacity: 0.9;

  a.gdt-close {
    float: right;
    text-decoration: none;
    margin-right: 3px;
    font-size: .8em;
    color: #aaa;

    &:hover {
      color: #999;
    }
  }
}
</style>