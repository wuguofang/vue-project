<template>
  <div>
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="reset-wrap">
        <group>
          <x-input 
            title="银行卡号" 
            v-model="bankCardNumber" 
            type="text" 
            placeholder="请输入银行卡号"
            @on-blur="change"
          ></x-input>
          <x-input 
            title="开户名" 
            v-model="bankCardName" 
            type="text" 
            placeholder="请输入开户名"
          ></x-input>
          <x-input
            v-if="bankName"
            readonly 
            title="所属银行" 
            placeholder="" 
            v-model="bankName" 
          ></x-input>
          <x-input 
            v-if="accountType"
            readonly
            title="账户类型" 
            placeholder="" 
            v-model="accountType" 
          ></x-input>
          <x-input 
            title="手机号" 
            v-model="bankMobile" 
            type="text" 
            placeholder="请输入银行卡绑定的手机号"
          ></x-input>
          <x-input 
            title="身份证号" 
            v-model="certNumber" 
            type="text" 
            placeholder="请输入身份证号"
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
import { mobileReg, certNumberReg } from 'util/reg'
import { Group, XInput, XButton } from 'vux'
import Qs from 'qs'
const accountTypeMap = {
  'DEBIT' : '借记卡',
  'CREDIT': '贷记卡'
}
const rules = {
  bankCardNumber: (val) => {
    return {
      result: !!val,
      errTips: '银行卡号不能为空'
    }
  },
  bankCardName: (val) => {
    return {
      result: !!val,
      errTips: '开户名不能为空'
    }
  },
  bankMobile: (val) => {
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
  }
}
export default {
  name: 'Reset',
  data () {
    return {
      bankMobile: '', // 手机号
      certNumber: '', // 身份证号
      bankCardNumber: '', // 银行卡号
      accountType: '', // 账户类型中文
      bankCardType: '', // 账户类型key
      bankCode: '', // 银行编码
      // back: '', // 银行卡背面
      // positive: '', // 银行卡正面
      bankCardName: '', //
      // bankBranch: '', // 所属支行
      bankName: '', // 所属银行
      deductChannel: '', // 扣款渠道
      signChannel: '', // 签约渠道
      // unionCode: '', // 银联编码
      option: {
        text: '修改银行卡号',
        style: 'orange',
        showBack: true
      },
      flag: true, // 银行卡变化请求信息flag
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    IHeader
  },
  methods: {
    // 提交
    submit () {
      if(!this.validate()) return
      this.$ajax({
        url : '/bankcard/apply_sign',
        method: 'post',
        data: {
          accountType: this.bankCardType,
          // back: "string",
          // bankBranch: "string",
          bankCardName: this.bankCardName,
          bankCardNumber: this.bankCardNumber,
          bankCode: this.bankCode,
          bankMobile: this.bankMobile,
          bankName: this.bankName,
          certNumber: this.certNumber,
          certType: "ID",
          deductChannel: 'ebay3024',
          // positive: "string",
          signChannel: 'ebay1024',
          // unionCode: "string"
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
    },
    // 监听银行卡变化 
    change (val) {
      this.getBankInfo()
    },
    // 获取银行卡信息
    getBankInfo () {
      this.$ajax({
        url : '/cardbin/query',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
        },
        transformRequest: [(data) => {
          data = Qs.stringify(data)
          return data
        }],
        data: {
          bankCardNumber: this.bankCardNumber
        },
        directAjax: true
      }).then(res => {
        if(res.success && res.data && res.data.target) {
          let { bankCardType, bankCode, bankName } = res.data.target
          this.bankCardType = bankCardType
          this.accountType = accountTypeMap[bankCardType]
          this.bankCode = bankCode
          this.bankName = bankName
        }else {
          this.$vux.toast.text(res.errorMsg, 'default')
        }
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
.page-modifybank {
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
