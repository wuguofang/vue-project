<template>
  <div>
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="reset-wrap">
        <group>
          <x-input 
            title="真实姓名" 
            v-model="userName" 
            type="text" 
            placeholder="请输入真实姓名"
          ></x-input>
          <x-input 
            title="身份证号" 
            v-model="certNumber" 
            type="text" 
            placeholder="请输入身份证号"
          ></x-input>
          <x-input 
            title="密码" 
            placeholder="请输入登录密码" 
            v-model="psw" 
          ></x-input>
          <x-input 
            title="新手机号" 
            placeholder="请输入新手机号" 
            v-model="mobile" 
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
import { mobileReg, certNumberReg } from 'util/reg'
import { Group, XInput, XButton } from 'vux'
import { JSEncrypt } from 'jsencrypt'
const encryptor = new JSEncrypt()
const rules = {
  psw: (val) => {
    return {
      result: !!val,
      errTips: '登录密码不能为空'
    }
  },
  mobile: (val) => {
    return {
      result: mobileReg.test(val),
      errTips: !val ? '手机号不能为空' : '手机号格式有误'
    }
  },
  certNumber: (val) => {
    return {
      result: certNumberReg.test(val),
      errTips: !val ? '身份证号不能为空' : '身份证号格式有误'
    }
  },
  userName: (val) => {
    return {
      result: !!val,
      errTips: '真实姓名不能为空'
    }
  }
}
export default {
  name: 'Reset',
  data () {
    return {
      mobile: '', // 手机号
      certNumber: '', // 身份证号
      certNumber: '', // 证件号
      psw: '', // 登录密码
      option: {
        text: '修改手机号',
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
          url : '/validation/checkpass',
          method: 'post',
          params: {
            certNumber: this.certNumber,
            userName: this.userName,
            mobile: this.mobile,
            pass: encryptor.encrypt(this.psw),
            passType: 'LOGINPASS'
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
    // 校验字段
    validate () {
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
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.page-modifymobile {
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
