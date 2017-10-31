<template>
  <table class="table-rules">
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
