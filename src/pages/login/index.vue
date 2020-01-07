<template>
  <div class="login-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <img class="logo" src="./images/logo.png" />
      <div class="info-wrap">
        <group>
          <x-input 
            placeholder="请输入手机号/邮箱/用户名" 
            title="用户名" 
            v-model="phone" 
            @on-change="mobileChange"
          >
          </x-input>
          <x-input 
            ref='psw'
            title="密码" 
            type="password" 
            placeholder="请输入密码" 
            v-model="psw"></x-input>
          <img-code 
            v-if="isOverTime"
            :needRefresh="needRefresh"
            :userName="phone"
            :imgCodeChange="imgCodeChange"
          ></img-code>
        </group>
        <div class="btn-wrap">
          <a @click="register">
            注册账号
          </a>
          <a @click="forget">
            忘记密码
          </a>
        </div>
        <x-button 
          class="submit-btn" 
          text="登录" 
          @click.native="loginCheck" 
          type="primary"
        ></x-button>
      </div>
    </div>
    <i-bottom></i-bottom>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
import IBottom from 'components/bottom-title/index.vue'
import MsgCode from 'components/msg-code/index.vue'
import ImgCode from 'components/img-code/index.vue'
import Cookies from 'js-cookie'
import { JSEncrypt } from 'jsencrypt'
import { mobileReg } from 'util/reg'
import { Group, XInput, XButton } from 'vux'
const encryptor = new JSEncrypt()
export default {
  name: 'Login',
  data () {
    return {
      phone: '', // 手机号
      psw: '', // 密码
      key: '', // 图形验证码key
      imgCode: '', // 超过三次填写图形验证码
      option: {
        text: '登录',
        style: 'orange',
        showBack: true
      },
      isOverTime: false, // 登录是否超过三次
      needRefresh: false, // 是否需要刷新验证码
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    IHeader,
    IBottom,
    MsgCode,
    ImgCode
  },
  methods: {
    // 获取公钥
    getPublicKey (callback) {
      this.$ajax({
        url : '/customer/get_public_key',
        method: 'post',
        params: {
          userName: this.phone
        },
        directAjax: true
      }).then(res => {
        if(res.success && res.data) {
          encryptor.setPublicKey(res.data.target)
          callback && callback()
        }else {
          this.$vux.toast.text('登录失败，请稍后再试', 'default')
        }
      })
    },
    // 手机号变化
    mobileChange (val) {
      // 取消图形验证码
      this.isOverTime = false
    },
    // 验证码变化
    imgCodeChange (args) {
      let { imgCode, key } = args
      this.imgCode = imgCode
      this.key = key
    },
    // 登录前校验
    loginCheck () {
      // 输入框校验
      if (!this.validate()) return
      // 继续登录
      this.login()
    },
    // 登录
    login () {
      // 获取公钥
      this.getPublicKey(
        () => {
          this.$ajax({
            url : '/customer/login',
            method: 'post',
            params: {
              userName: this.phone,
              pass: encryptor.encrypt(this.psw),
              code: this.imgCode,
              codeKey: this.key
            },
            directAjax: true
          }).then(res => {
            if(res.success && res.data) {
              // 登录成功 跳转至首页
              Cookies.set('token', res.data.token, { expires: 1 })
              this.$router.push({path: '/index'})
            }else {
              // 判断是否超过三次
              if(res.errorTimes >= 3) {
                if(this.isOverTime) {
                  this.needRefresh = true
                }
                this.isOverTime = true
              }
              this.$vux.toast.text(res.errorMsg, 'default')
            }
          })
        }
      )
    },
    // 登录校验
    validate () {
      let self = this
      let baseRules = {
        phone: (val) => {
          return {
            result: !!val,
            errTips: '手机号不能为空'
          }
        },
        psw: (val) => {
          return {
            result: !!val,
            errTips: '密码不能为空'
          }
        }
      }
      let addRules = {
        imgCode: (val) => {
          return {
            result: !!val,
            errTips: '图形验证码不能为空'
          }
        }
      }
      let rules = this.isOverTime ? Object.assign({}, baseRules, addRules) : baseRules
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
    // 跳转注册前验证页面
    register () {
      this.$router.push({
        path: '/validate-mobile',
        query: {
          opType: 'REGIST',
          nextPage: '/register'
        }
      })
    },
    // 跳转忘记密码页面
    forget () {
      this.$router.push({
        path: '/modify-password',
        query: {
          type: 'forget'
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
    height: 400px;
    margin: 44px 0;
  }
  .weui-cells {
    .vux-x-input {
      .weui-label {
        width: 136px!important;
        text-align: justify;
        text-align-last: justify;
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
