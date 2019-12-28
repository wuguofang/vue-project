<template>
  <div>
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="reset-wrap">
        <group>
          <msg-code v-on:codeChange="phoneChange"></msg-code>
          <x-input title="验证码" type="text" placeholder="请输入短信验证码" v-model="code"  @on-change="inputChange('code', $event)"></x-input>
          <x-input title="密码" type="password" placeholder="请输入密码" v-model="psw"  @on-change="inputChange('psw', $event)"></x-input>
        </group>
        <x-button class="submit-btn" text="确定" :disabled="!allowLogin" @click.native="confirm" type="primary"></x-button>
      </div>
    </div>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
import MsgCode from 'components/msg-code/index.vue'
import { mobileReg } from 'util/reg'
import { Group, XInput, XButton } from 'vux'
export default {
  name: 'Reset',
  data () {
    return {
      phone: '', // 手机号
      code: '', // 验证码
      psw: '', // 密码
      allowLogin: false, // 是否允许登录
      option: {
        text: '重置密码',
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
    MsgCode
  },
  methods: {
    // 确定
    confirm () {
      if (!this.validate()) return
      console.log('---confirm---')
    },
    // 电话号码校验通过改变
    phoneChange ({ val, allowSend }) {
      if (allowSend && this.code && this.psw) {
        this.allowLogin = true
      } else {
        this.allowLogin = false
      }
      this.phone = val
    },
    // 更改登录按钮状态
    inputChange (...args) {
      let [attr, val] = args
      this.allowLogin = false
      if (attr === 'code' && this.psw && val && mobileReg.test(this.phone)) {
        this.allowLogin = true
      }
      if (attr === 'psw' && this.code && val && mobileReg.test(this.phone)) {
        this.allowLogin = true
      }
    },
    // 校验
    validate () {
      let self = this
      let rules = {
        phone: (val) => {
          return {
            result: !!val,
            errTips: '手机号不能为空'
          }
        },
        code: (val) => {
          return {
            result: !!val,
            errTips: '验证码不能为空'
          }
        },
        psw: (val) => {
          return {
            result: !!val,
            errTips: '密码不能为空'
          }
        }
      }
      for (let key in rules) {
        let valid = rules[key]
        let r = valid(self[key])
        if (!r.result) {
          self.$vux.toast.text(r.errTips)
          return false
        }
      }
      return true
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.reset-wrap {
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
