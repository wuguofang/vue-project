<template>
  <div>
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="apply-wrap">
        <group>
          <x-input 
            title="手机号" 
            v-model="mobile" 
            placeholder="请输入手机号"
          ></x-input>

          <x-input 
            title="姓名" 
            v-model="aliasName" 
            placeholder="请输入姓名"
          ></x-input>

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
            title="婚姻状态" 
            v-model="married"
            :options="ddmap.maritalStatus">
          </selector>

          <selector
            title="学历" 
            v-model="education"
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
          text="提交" 
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
import { Group, XInput, XButton, Selector } from 'vux'
import ddmap from 'util/ddmap'
import { mobileReg, certNumberReg } from 'util/reg'
const rules = {
  mobile: (val) => {
    return {
      result: mobileReg.test(val),
      errTips: !val ? '手机号不能为空' : '手机号格式有误'
    }
  },
  aliasName: (val) => {
    return {
      result: !!val,
      errTips: '姓名不能为空'
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
  name: 'Apply',
  data () {
    return {
      aliasName: '',
      mobile: '',
      certNumber: '',
      address: '',
      married: '',
      loginPass: '',
      education: '',
      option: {
        text: '填写申请资料',
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
    // 提交资料
    submit () {
      if(!this.validate()) return
      this.$ajax({
        url : '/person/regist',
        method: 'post',
        data: {
          userType: 'PERSON',
          aliasName: this.aliasName,
          mobile: this.mobile,
          certNumber: this.certNumber,
          address: this.address,
          married: this.married,
          loginPass: this.psw,
          education: this.education
        },
        directAjax: true
      }).then(res => {
        this.$judgeLogin(res)
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
.page-apply {
  .slider-bg {
    display: none;
  }
}
.apply-wrap {
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
