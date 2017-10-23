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
        <td>
          <input type="checkbox"
                 v-model="rule.enabled"
                 @change="$emit('update', rule)" />
        </td>
        <td>
          <button type="button"
                  v-if="rule.site != '*'"
                  @click="$emit('remove', rule)">删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['rules']
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
