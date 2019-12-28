<template>
  <x-input placeholder="请输入手机号" title="手机号" class="msg-code" v-model="phone" @on-change="phoneChange">
    <x-button :disabled="!allowSend" slot="right" type="primary" mini @click.native="sendMsg">
      {{wait ? `重新发送(${count}s)` : '发送验证码'}}
    </x-button>
  </x-input>
</template>

<script>
import { XInput, XButton } from 'vux'
import { mobileReg } from 'util/reg'
export default {
  name: 'msgcode',
  props: {
    option: {
      default: function () {
        return {
        }
      }
    }
  },
  data () {
    return {
      phone: '', // 手机号
      allowSend: false, // 是否允许发送验证码
      wait: false,
      count: 10
    }
  },
  components: {
    XInput,
    XButton
  },
  computed: {
  },
  methods: {
    // 手机号码变化
    phoneChange (e) {
      if (mobileReg.test(e)) {
        this.allowSend = true
      } else {
        this.allowSend = false
      }
      this.$emit('codeChange', {
        val: e,
        allowSend: this.allowSend
      })
    },
    // 发送验证码
    sendMsg () {
      setTimeout(() => {
        this.$vux.toast.text('发送验证码成功', 'default')
        this.wait = true
        this.allowSend = false
        this.countDown()
      }, 2000)
    },
    // 倒计时
    countDown () {
      setInterval(() => {
        if (this.count === 1) {
          this.wait = false
          this.allowSend = true
        } else {
          this.count--
        }
      }, 1000)
    }
  },
  created () {}
}
</script>

<style rel="stylesheet/less" lang="less">
</style>
