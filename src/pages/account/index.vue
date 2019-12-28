<template>
  <div class="account-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <pannel-title text="账户信息">
        <a class="login-btn">登录／注册</a>
      </pannel-title>
    </div>
    <i-tab></i-tab>
  </div>
</template>

<script>
import PannelTitle from 'components/pannel-title/index.vue'
import IHeader from 'components/header/index.vue'
import ITab from 'components/tab/index.vue'
export default {
  name: 'Account',
  data () {
    return {
      option: {
        text: '掌柜无忧',
        style: 'orange',
        showBack: true
      }
    }
  },
  components: {
    IHeader,
    ITab,
    PannelTitle
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.account-wrap {
  text-align: left;
  .login-btn {
    font-size: 32px;
    color: #fff;
    float: right;
    margin-top: 10px;
  }
}
</style>
