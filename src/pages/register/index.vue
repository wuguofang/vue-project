<template>
  <div>
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="register-wrap">
        <group>
          <x-input title="验证码" type="text" placeholder="请输入短信验证码"></x-input>
          <x-input title="密码" type="password" placeholder="请输入密码"></x-input>
        </group>
        <x-button class="submit-btn" text="注册" type="primary"></x-button>
      </div>
    </div>
    <i-bottom></i-bottom>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
import IBottom from 'components/bottom-title/index.vue'
import MsgCode from 'components/msg-code/index.vue'
import { Group, XInput, XButton } from 'vux'
export default {
  name: 'Register',
  data () {
    return {
      option: {
        text: '注册',
        style: 'orange',
        showBack: true
      }
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    IHeader,
    IBottom,
    MsgCode
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.register-wrap {
  padding: 0 30px;
  .submit-btn {
    margin-top: 30px;
  }
  .weui-cells {
    .vux-x-input {
      .weui-label {
        width: 96px!important;
      }
    }
  }
}
</style>
