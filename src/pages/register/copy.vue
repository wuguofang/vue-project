<template>
  <div>
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="register-wrap">
        <group>
          <x-input 
            title="手机号" 
            v-model="mobile" 
            readonly
            @click="changeMobile"
            placeholder="请输入手机号"
          ></x-input>

          <x-input 
            title="真实姓名" 
            v-model="certName" 
            placeholder="请输入真实姓名"
          ></x-input>

          <selector
            title="性别" 
            v-model="sex"
            placeholder="请选择性别"
            :options="ddmap.sex">
          </selector>

          <x-input 
            title="身份证号" 
            v-model="certNumber" 
            type="text" 
            placeholder="请输入身份证号"
          ></x-input>

          <x-input 
            title="住址" 
            v-model="address" 
            type="text" 
            placeholder="请输入详细地址"
          ></x-input>

          <selector
            title="婚姻状况" 
            v-model="married"
            placeholder="请选择婚姻状况"
            :options="ddmap.maritalStatus">
          </selector>

          <selector
            title="学历" 
            v-model="education"
            placeholder="请选择学历"
            :options="ddmap.diploma">
          </selector>

          <x-input 
            title="密码" 
            v-model="loginPass" 
            type="password" 
            placeholder="请输入密码"
          ></x-input>

        </group>
        <x-button 
          class="submit-btn" 
          text="注册" 
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
import { JSEncrypt } from 'jsencrypt'
import { Group, XInput, XButton, Selector } from 'vux'
import { mobileReg, certNumberReg } from 'util/reg'
import ddmap from 'util/ddmap'
const encryptor = new JSEncrypt()
const rules = {
  mobile: (val) => {
    return {
      result: mobileReg.test(val),
      errTips: !val ? '手机号不能为空' : '手机号格式有误'
    }
  },
  certName: (val) => {
    return {
      result: !!val,
      errTips: '真实姓名不能为空'
    }
  },
  sex: (val) => {
    console.log(val)
    return {
      result: !!val,
      errTips: '性别不能为空'
    }
  },
  certNumber: (val) => {
    return {
      result: certNumberReg.test(val),
      errTips: !val ? '身份证不能为空' : '身份证格式有误'
    }
  },
  address: (val) => {
    return {
      result: !!val,
      errTips: '住址不能为空'
    }
  },
  married: (val) => {
    return {
      result: !!val,
      errTips: '婚姻状态不能为空'
    }
  },
  education: (val) => {
    return {
      result: !!val,
      errTips: '学历不能为空'
    }
  },
  loginPass: (val) => {
    return {
      result: !!val,
      errTips: '登录密码不能为空'
    }
  },
}
export default {
  name: 'Register',
  data () {
    return {
      certName: '',
      mobile: '',
      certNumber: '',
      address: '',
      married: '',
      loginPass: '',
      education: '',
      sex: '',
      option: {
        text: '注册',
        style: 'orange',
        showBack: true
      },
      ddmap: ddmap,
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    IHeader,
    IBottom,
    MsgCode,
    Selector
  },
  mounted() {
    this.mobile = this.$router.history.current.query.mobile
  },
  methods: {
    // 获取公钥
    getPublicKey (callback) {
      this.$ajax({
        url : '/customer/get_regist_public_key',
        method: 'post',
        data: {
          userName: this.mobile
        },
        directAjax: true
      }).then(res => {
        if(res.success && res.data) {
          encryptor.setPublicKey(res.data.target)
          callback && callback()
        }else {
          this.$vux.toast.text('注册失败，请稍后再试', 'default')
        }
      })
    },
    // 提交注册
    submit () {
      if(!this.validate()) return
      this.getPublicKey(() => {
        this.$ajax({
          url : '/person/regist',
          method: 'post',
          data: {
            certType: "ID",
            registSource: 'FRONTEND',
            userType: 'PERSON',
            userName: this.mobile,
            certName: this.certName,
            mobile: this.mobile,
            certNumber: this.certNumber,
            address: this.address,
            married: this.married,
            loginPass: encryptor.encrypt(this.loginPass),
            education: this.education,
            sex: this.sex
          },
          directAjax: true
        }).then(res => {
          if(res.success) {
            // 注册成功 跳转至登录页面
            this.$vux.toast.text('注册成功', 'success')
            setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 2000)
          }else {
            this.$vux.toast.text(res.errorMsg, 'default')
          }
        })
      })
    },
    // 若需要修改手机则返回上一步
    changeMobile () {
      this.$vux.toast.text('若需修改手机号，请返回上一步');
    },
    // 校验字段
    validate (showTip) {
      for(var key in rules) {
        var valid = rules[key];
        var r = valid(this[key]);
        if(!r.result) {
          this.$vux.toast.text(r.errTips);
          return false;
        }
      }
      return true;
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.page-register {
  .slider-bg {
    display: none;
  }
}
.register-wrap {
  .submit-btn {
    margin-top: 30px;
  }
  .weui-cells {
    .vux-x-input, .vux-selector {
      .weui-label {
        width: 136px!important;
        // height: 40px!important;
        text-align: justify;
        text-align-last: justify;
        // &::after {
        //   content: '';
        //   display: inline-block;
        //   height: 0;
        //   width: 100%;
        // }
      }
    }
  }
}
</style>
