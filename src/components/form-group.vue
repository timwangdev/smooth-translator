<template>
  <div class="form-group">
    <label class="control-label">{{ label }}</label>
    <div class="controls">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-group',
  props: ['label'],
};
</script>

<style lang="sass">

</style>
