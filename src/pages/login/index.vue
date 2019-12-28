<template>
  <div class="login-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <img class="logo" src="./images/logo.png" />
      <div class="info-wrap">
        <group>
          <msg-code v-on:codeChange="phoneChange">
          </msg-code>
          <x-input @on-change="inputChange('code', $event)" title="验证码" type="text" placeholder="请输入验证码" v-model="code"></x-input>
        </group>
        <div class="btn-wrap">
          <a @click="register">
            注册账号
          </a>
        </div>
        <x-button class="submit-btn" text="登录" :disabled="!allowLogin" @click.native="login" type="primary"></x-button>
      </div>
    </div>
    <i-bottom></i-bottom>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
import IBottom from 'components/bottom-title/index.vue'
import MsgCode from 'components/msg-code/index.vue'
import { mobileReg } from 'util/reg'
import { Group, XInput, XButton } from 'vux'
export default {
  name: 'Login',
  data () {
    return {
      phone: '', // 手机号
      code: '', // 验证码
      allowLogin: false, // 是否允许登录
      option: {
        text: '登录',
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
    // 登录
    login () {
      if (!this.validate()) return
      console.log('---login---')
    },
    // 登录校验
    validate () {
      let self = this
      let rules = {
        code: (val) => {
          return {
            result: !!val,
            errTips: '验证码不能为空'
          }
        },
        phone: (val) => {
          return {
            result: !!val,
            errTips: '手机号不能为空'
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
    },
    // 跳转注册页面
    register () {
      this.$router.push({path: '/register'})
    },
    // 电话号码校验通过改变
    phoneChange ({ val, allowSend }) {
      if (allowSend && this.code) {
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
      ['phone', 'code'].map((item) => {
        if (attr === 'phone') {
          if (mobileReg.test(val) && item !== attr && this[attr]) {
            this.allowLogin = true
          }
        } else {
          if (val && item !== attr && this[attr] && mobileReg.test(this.phone)) {
            this.allowLogin = true
          }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.page-login {
  .slider-bg {
    display: none;
  }
}
.login-wrap {
  .logo {
    width: 378px;
    height: 400px;
    margin: 64px 0;
  }
  .weui-cells {
    .vux-x-input {
      .weui-label {
        width: 96px!important;
      }
    }
  }
  .info-wrap {
    .submit-btn {
      line-height: 80px;
      font-size: 36px;
      margin-top: 30px;
    }
  }
  .btn-wrap {
    text-align: left;
    margin-top: 20px;
    a {
      font-size: 32px;
      color: #FF5000;
      &:nth-child(2) {
        float: right;
      }
    }
  }
}
</style>
