<template>
  <div>
    <a @click.prevent="show" class="test">——发布需求，专业人才主动来帮您——</a>
    <toast v-model="showToast"  type="text">
      test
    </toast>
  </div>
</template>

<script>
import { Toast } from 'vux'

export default {
  name: 'Index',
  data () {
    return {
      showToast: false
    }
  },
  components: {
    Toast
  },
  methods: {
    show () {
      this.showToast = true
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.test {
  font-size: 28px;
  font-weight: 500;
}
</style>
