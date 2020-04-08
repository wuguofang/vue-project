<template>
  <div>
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="reset-wrap">
        <group v-if="input">
          <x-input 
            v-if="input.type == 'text'"
            :title="input.label" 
            type="text" 
            :placeholder="'请输入' + input.label" v-model="val" 
            @on-change="inputChange"
          ></x-input>
          <x-address 
            v-if="input.type == 'address'"
            :title="input.label" 
            v-model="val" 
            :list="addressData" 
            placeholder="请选择地址"></x-address>
        </group>
        <x-button 
          class="submit-btn" 
          text="确定" 
          @click.native="confirm" 
          type="primary"
        ></x-button>
      </div>
    </div>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
import MsgCode from 'components/msg-code/index.vue'
import { Group, XInput, XButton, XAddress, ChinaAddressV4Data } from 'vux'
import { mobileReg, certNumberReg } from 'util/reg'

// 字段对应映射
const INPUTMAP = {
  'email': {
    label: '邮箱',
    type: 'text',
    api: '/customer/update_email'
  },
  'address': {
    label: '通信地址',
    type: 'text',
    api: '/person/update'
  }
}
export default {
  name: 'Reset',
  data () {
    return {
      addressData: ChinaAddressV4Data,
      input: null, // 输入框信息
      val: '', // 输入框值
    }
  },
  computed: {
    option() {
      return {
        text: `修改${this.input && this.input.label || ''}`,
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
    MsgCode,
    XAddress
  },
  methods: {
    // 确定
    confirm () {
      if (!this.validate()) return
      // 确认修改
      this.$ajax({
        url : this.input.api,
        method: 'post',
        params: {
          [this.input.params || this.name]: this.val
        },
        directAjax: true
      }).then(res => {
        if(res.success) {
          // 修改成功 跳转至账户页面
          this.$vux.toast.text('修改成功', 'success')
          setTimeout(() => {
            this.$router.push({path: '/account'})
          }, 2000)
        }else {
          this.$vux.toast.text(res.errorMsg, 'default')
        }
      })
    },
    // 监听变化
    inputChange (e) {
      if(e) {
        this.allowLogin = true
      }else {
        this.allowLogin = false
      }
    },
    // 校验
    validate () {
      let { rule, label } = this.input
      if(rule && !rule.test(this.val)) {
        this.$vux.toast.text(label + '格式不正确', 'default')
        return false
      }else {
        return true
      }
    }
  },
  mounted() {
    console.log(this.$route.query)
    let { query: { name } } = this.$route
    this.name = name
    this.input = INPUTMAP[this.name]
    if(this.input.type == 'address') {
      this.val = []
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.page-modify {
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
      }
    }
  }
}
</style>
