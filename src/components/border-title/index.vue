<template>
  <div class="border-title">
    <span>{{text}}</span>
    <slot></slot>
    <!-- <img src="./images/more.png" @click="goMore" /> -->
  </div>
</template>

<script>
export default {
  name: 'bordertitle',
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
.border-title {
  position: relative;
  font-size: 32px;
  color: #FF5000;
  background: #FFF5E8;
  border-color: #FF6A2F;
  border-style: solid;
  border-width: 1PX 1PX 0 1PX;
  border-radius: 4PX 4PX 0 0;
  padding: 24px;
  text-align: left;
  span {
    vertical-align: middle;
  }
}
</style>
