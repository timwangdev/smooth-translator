<template>
  <div class="form-group">
    <label class="control-label">{{ label }}</label>
    <div class="controls">
      <label class="radio-inline"><input type="radio" name="translator" ng-model="options.translator" value="youdao" /> 有道翻译</label>
      <label class="radio-inline"><input type="radio" name="translator" ng-model="options.translator" value="baidu" /> 百度翻译</label>
      <label class="radio-inline"><input type="radio" name="translator" ng-model="options.translator" value="bing" /> 必应翻译</label>
    </div>
  </div>
</template>

<script>
  
</script>

<style lang="sass">

</style>