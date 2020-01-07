<template>
  <div>
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="registerbefore-wrap">
        <group>
          <msg-code
            :opType="opType"
            :mobileLabel="mobileLabel"
            :mobilePlaceholder="mobilePlaceholder"
            :msgCodeChange="msgCodeChange"
            :clearMobile="true"
          >
          </msg-code>
        </group>
        <x-button 
          :disabled="!allowLogin"
          class="submit-btn" 
          text="确定" 
          type="primary" 
          @click.native="submit"
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
import { Group, XInput, XButton } from 'vux'
export default {
  name: 'ValidateMobile',
  data () {
    return {
      mobile: '',
      allowLogin: false,
      id: '',
      code: '',
      option: {
        text: '手机号验证',
        style: 'orange',
        showBack: true
      },
      opType: '',
      mobileLabel: '',
      mobilePlaceholder: '',
      nextPage: ''
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
  mounted() {
    let { query: { opType, mobileLabel, mobilePlaceholder, nextPage } } = this.$route
    this.opType = opType
    this.nextPage = nextPage
    this.mobileLabel = mobileLabel
    this.mobilePlaceholder = mobilePlaceholder
  },
  methods: {
    // 提交
    submit () {
      this.$ajax({
        url : '/validation/validate',
        method: 'post',
        params: {
          validateCode: this.code,
          mobile: this.mobile,
          id: this.id
        },
        directAjax: true
      }).then(res => {
        if(res.success) {
          // 验证成功 跳转至注册页面
          this.$router.push({
            path: this.nextPage, 
            query: { mobile: this.mobile }
          })
        }else {
          this.$vux.toast.text(res.errorMsg, 'default')
        }
      })
    },
    // 验证码变化
    msgCodeChange (args) {
      let { code, phone, id, allowSubmit } = args
      this.code = code
      this.mobile = phone
      this.id = id
      this.allowLogin = allowSubmit
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.page-validatemobile {
  .slider-bg {
    display: none;
  }
}
.registerbefore-wrap {
  .submit-btn {
    margin-top: 30px;
  }
  .weui-cells {
    .vux-x-input, .vux-selector {
      .weui-label {
        width: 136px!important;
        text-align: justify;
        text-align-last: justify;
      }
    }
  }
}
</style>
