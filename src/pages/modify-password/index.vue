<template>
  <div>
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="reset-wrap">
        <group>
          <msg-code
            v-if="TypeMap[type]"
            :opType="TypeMap[type].op"
            :msgCodeChange="msgCodeChange"
            :clearMobile="clearMobile"
          >
          </msg-code>
          <x-input 
            title="身份证号" 
            v-model="certNumber" 
            type="text" 
            placeholder="请输入身份证号"
          ></x-input>
          <x-input 
            title="新密码" 
            type="password" 
            placeholder="密码必须为字母和数字的组合" 
            v-model="psw" 
          ></x-input>
          <x-input 
            title="确认密码" 
            v-model="pswConfirm" 
            type="password" 
            placeholder="请再次输入密码"
          ></x-input>
        </group>
        <x-button 
          class="submit-btn" 
          text="确定" 
          @click.native="submit" 
          type="primary"></x-button>
      </div>
    </div>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
import MsgCode from 'components/msg-code/index.vue'
import { mobileReg, certNumberReg, pswReg } from 'util/reg'
import { JSEncrypt } from 'jsencrypt'
import { Group, XInput, XButton } from 'vux'
const encryptor = new JSEncrypt()
const TypeMap = {
  'modify': {
    op: 'MODIFYPASS',
    name: '修改密码',
    clearMobile: false
  },
  'forget': {
    op: 'FINDPASS',
    name: '忘记密码',
    clearMobile: true
  }
}
export default {
  name: 'Reset',
  data () {
    return {
      mobile: '', // 手机号
      code: '', // 验证码
      psw: '', // 密码
      pswConfirm: '', // 确认密码
      certNumber: '', // 身份证号
      isSend: false, // 是否发送验证码
      allowLogin: false, // 是否允许登录
      option: {
        text: '',
        style: 'orange',
        showBack: true
      },
      clearMobile: false,
      TypeMap: TypeMap,
      type: '', // 修改密码 or 忘记密码
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    IHeader,
    MsgCode
  },
  mounted() {
    this.type = this.$router.history.current.query.type
    this.option.text = this.TypeMap[this.type].name
    this.clearMobile = this.TypeMap[this.type].clearMobile
  },
  methods: {
    // 获取公钥
    getPublicKey (callback) {
      this.$ajax({
        url : '/customer/get_public_key',
        method: 'post',
        params: {
          userName: this.mobile
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
    // 提交
    submit () {
      if(!this.validate()) return
      this.getPublicKey(() => {
        this.$ajax({
          url : '/validation/svalidate',
          method: 'post',
          params: {
            validateCode: this.code,
            certNumber: this.certNumber,
            id: this.id,
            mobile: this.mobile,
            newPass: encryptor.encrypt(this.psw),
            newPassType: 'LOGINPASS'
          },
          directAjax: true
        }).then(res => {
          if(res.success) {
            this.$vux.toast.text('修改成功', 'default')
            setTimeout(() => {
              // 修改成功 跳转至来源页面
              this.$router.go(-1)
            }, 2000)
          }else {
            this.$vux.toast.text(res.errorMsg, 'default')
          }
        })
      })
    },
    // 验证码变化
    msgCodeChange (args) {
      let { code, phone, allowSubmit, id } = args
      this.code = code
      this.mobile = phone
      this.id = id
      this.isSend = allowSubmit
      // 触发变化
      // this.change(this.psw)
    },
    // 校验
    validate () {
      const rules = {
        psw: (val) => {
          return {
            result: pswReg.test(val),
            errTips: '登录密码必须为字母和数字的组合'
          }
        },
        pswConfirm: (val) => {
          return {
            result: val == this.psw,
            errTips: '两次密码输入不一致'
          }
        },
        certNumber: (val) => {
          return {
            result: certNumberReg.test(val),
            errTips: !val ? '身份证号不能为空' : '身份证号格式有误'
          }
        }
      }
      for(var key in rules) {
        var valid = rules[key];
        var r = valid(this[key]);
        if(!r.result) {
          this.$vux.toast.text(r.errTips);
          return false;
        }
      }
      return true;
    },
    // // 监听变化
    // change (val) {
    //   if(this.isSend && pswReg.test(val) && mobileReg.test(this.mobile) && this.code && certNumberReg.test(this.certNumber)) {
    //     this.allowLogin = true
    //   }else {
    //     this.allowLogin = false
    //   }
    // }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.page-modifypassword {
  .slider-bg {
    display: none;
  }
}
.reset-wrap {
  .submit-btn {
    margin-top: 30px;
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
}
</style>
