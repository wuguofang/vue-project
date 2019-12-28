<template>
  <div>
    <i-header :option="option"></i-header>
    <div>
      产品列表
    </div>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
export default {
  name: 'Index',
  data () {
    return {
      option: {
        text: '产品列表',
        style: 'orange',
        showBack: true
      }
    }
  },
  components: {
    IHeader
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
</style>
