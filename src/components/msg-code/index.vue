<template>
  <div>
    <x-input 
      :placeholder="mobilePlaceholder || '请输入手机号'" 
      :title="mobileLabel || '手机号'" 
      class="msg-code" 
      v-model="phone" 
      :disabled="!clearMobile"
      @on-change="phoneChange"
    >
    </x-input>
    <x-input 
      title="验证码" 
      v-model="code" 
      placeholder="请输入验证码"
      ref="code"
      @on-change="change"
    >
      <x-button 
        class="msg-btn"
        :disabled="!allowSend" 
        slot="right" 
        type="primary" 
        mini 
        @click.native="sendMsg"
      >
        {{wait ? `重新发送(${count}s)` : '发送验证码'}}
      </x-button>
    </x-input>
  </div>
</template>

<script>
import { XInput, XButton } from 'vux'
import { mobileReg } from 'util/reg'
let interval = null
export default {
  name: 'msgcode',
  props: {
    msgCodeChange: {
      default: function () {
        return {
        }
      }
    },
    opType: '',
    mobileLabel: '',
    mobilePlaceholder: '',
    clearMobile: false
  },
  data () {
    return {
      phone: '', // 手机号
      code: '', // 验证码
      allowSend: false, // 是否允许发送验证码
      isSend: false,
      wait: false,
      count: 0,
      id: '', // 发送验证码接口返回
      countAttr: this.opType + 'count'
    }
  },
  components: {
    XInput,
    XButton
  },
  mounted () {
    // 不需要带出则不执行以下代码
    if(this.clearMobile) return
    if(localStorage.getItem('msgMobile') && localStorage.getItem('msgMobile') != 'undefined') {
      // 有变化会触发phoneChange
      this.phone = localStorage.getItem('msgMobile') || ''
    }else {
      this.getInfo()
    }
    this.count = this.getTime()
    this.id = this.getId()
  },
  destroyed () {
    clearInterval(interval)
  },
  methods: {
    // 获取用户信息
    getInfo () {
      this.$ajax({
        url : '/person/detail',
        method: 'get',
        directAjax: true
      }).then(res => {
        this.$judgeLogin(res)
        if(res.success && res.data && res.data.target) {
          let { mobile } = res.data.target
          if(mobile)  {
            this.phone = mobile
            localStorage.setItem('msgMobile', mobile)
          }else {
            this.$vux.toast.text('该账号未绑定手机号，请检查', 'default')
          }
        }
      })
    },
    // 手机号码变化
    phoneChange (e) {
      let val = e || this.phone
      if (mobileReg.test(val)) {
        // 假如倒计时未结束退出则继续
        let count = JSON.parse(localStorage.getItem(this.countAttr))
        if(Boolean(count) && count[val]) {
          this.wait = true
          this.allowSend = false
          this.isSend = true
          this.countDown()
          this.change()
        }
        this.allowSend = true
      } else {
        clearInterval(interval)
        this.wait = false
        this.allowSend = false
      }
      this.change()
    },
    // 验证码变化
    change () {
      this.msgCodeChange && this.msgCodeChange({
        allowSubmit: this.validate(),
        code: this.code,
        phone: this.phone,
        id: this.id
      })
    },
    // 校验是否可以点击提交
    validate () {
      return this.code && mobileReg.test(this.phone) && this.isSend
    },
    // 发送验证码
    sendMsg () {
      this.$ajax({
        url : '/validation/apply',
        method: 'post',
        params: {
          userName: this.phone,
          opType: this.opType,
          type: 0
        },
        directAjax: true
      }).then(res => {
        if(res.success && res.data && res.data.target) {
          this.id = res.data.target
          this.$vux.toast.text('发送验证码成功', 'default')
          this.wait = true
          this.allowSend = false
          this.isSend = true
          // 发送成功先置空
          this.code = ''
          this.change()
          this.countDown()
          // 存储验证码发送之后id，避免刷新丢失
          this.setId()
          localStorage.setItem('msgMobile', this.phone)
          this.$refs.code.focus();
        }else {
          this.$vux.toast.text(res.errorMsg, 'default')
        }
      })
    },
    // 倒计时
    countDown () {
      this.count = this.getTime()
      interval = setInterval(() => {
        // 获取倒计时剩余时间 避免客户刷新页面倒计时重置
        let count = this.getTime()
        if (count <= 1) {
          this.wait = false
          if(mobileReg.test(this.phone)) {
            this.allowSend = true
          }
          clearInterval(interval)
          // 此处为部分清空
          let baseCount = JSON.parse(localStorage.getItem(this.countAttr))
          baseCount[this.phone] = null
          localStorage.setItem(this.countAttr, JSON.stringify(baseCount))
        } else {
          count--
          this.wait = true
          this.allowSend = false
          this.setTime(count)
          this.count = count
        }
      }, 1000)
    },
    // 设置验证码id，避免刷新丢失
    setId () {
      let before = localStorage.getItem('msgId')
      localStorage.setItem('msgId', JSON.stringify(Object.assign({}, JSON.parse(before), {
        [this.phone]: this.id
      })))
    },
    // 获取验证码发送后id
    getId () {
      let id = JSON.parse(localStorage.getItem('msgId'))
      return id && id[this.phone] ? id[this.phone] : ''
    },
    // 设置倒计时剩余时间
    setTime (time) {
      let before = localStorage.getItem(this.countAttr)
      localStorage.setItem(this.countAttr, JSON.stringify(Object.assign({}, JSON.parse(before), {
        [this.phone]: time
      })))
    },
    // 获取倒计时剩余时间
    getTime () {
      let count = JSON.parse(localStorage.getItem(this.countAttr))
      return count && count[this.phone] ? count[this.phone] : 60
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.msg-btn {
  padding: 0 20px;
}
</style>
