<template>
  <div class="pannel-title">
    <span>{{text}}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'panneltitle',
  props: {
    text: {
      default: function () {
        return {
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.pannel-title {
  font-size: 48px;
  color: #fff;
  font-weight: bold;
}
</style>
