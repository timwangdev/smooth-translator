<template>
  <div>
    <label class="radio-inline" v-for="option in options">
      <input type="radio"
        :name="name"
        :value="option.key"
        :checked="option.key == value"
        @change="checkOption" />
      {{ option.text }}
    </label>
  </div>
</template>

<script>
export default {
  props: ['options', 'value', 'name'],
  methods: {
    checkOption(event) {
      this.$emit('change', event.target.value);
    },
  },
};
</script>
