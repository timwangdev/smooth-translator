<template>
  <table>
    <thead>
      <tr>
        <th width="80%">网站</th>
        <th>启用</th>
        <th>删除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rule in rules">
        <td width="80%">{{ rule.site === '*' ? '默认' : rule.site }}</td>
        <td><input type="checkbox" v-model="rule.enabled" /></td>
        <td>删除</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['rules'],
  watch: {
    rules(newRules) {
      this.$emit('change', newRules);
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border: 2px solid #ddd;

  th, td {
    padding: 5px 10px;
    text-align: center;

    &:first-child {
      text-align: left;
    }
  }

  th {
    background-color: #ddd;
  }

  tbody tr:not(:first-child) td {
    border-top: 1px solid #ddd;
  }
}
</style>
