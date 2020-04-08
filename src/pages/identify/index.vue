<template>
  <div>
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="identify-wrap">
        <group>
          <x-input 
            title="真实姓名" 
            disabled
            placeholder="请输入真实姓名" 
            v-model="certName"
            >
          </x-input>
          <x-input 
            title="身份证号" 
            disabled
            placeholder="请输入身份证号" 
            v-model="certNumber">
          </x-input>
          <div class="upload-wrap clearfix">
            <div class="upload-label">身份证照</div>
            <div class="upload-item">
              <!-- <div class="upload-bg">
                <img src="./images/upload-bg.png" />
                <p>
                  正
                </p>
              </div> -->
              <uploader
                title=""
                :showHeader="false"
                :max="1"
                :upload-url="uploadUrl"
                name="img"
                size="small"
                :uploadSuccess="(val) => {this.uploadSuccess('certPositive', val)}"
              ></uploader>
            </div>
            <div class="upload-item">
              <!-- <div class="upload-bg">
                <img src="./images/upload-bg.png" />
                <p>
                  反
                </p>
              </div> -->
              <uploader
                title=""
                :showHeader="false"
                :max="1"
                :upload-url="uploadUrl"
                name="img"
                size="small"
                :uploadSuccess="(val) => {this.uploadSuccess('certBack', val)}"
              ></uploader>
            </div>
          </div>
          <div class="upload-wrap clearfix">
            <div class="upload-label">银行卡照</div>
            <div class="upload-item">
              <!-- <div class="upload-bg">
                <img src="./images/upload-bg.png" />
                <p>
                  正
                </p>
              </div> -->
              <uploader
                title=""
                :showHeader="false"
                :max="1"
                :upload-url="uploadUrl"
                name="img"
                size="small"
                :uploadSuccess="(val) => {this.uploadSuccess('bankCardPositive', val)}"
              ></uploader>
            </div>
            <div class="upload-item">
              <!-- <div class="upload-bg">
                <img src="./images/upload-bg.png" />
                <p>
                  反
                </p>
              </div> -->
              <uploader
                title=""
                :showHeader="false"
                :max="1"
                :upload-url="uploadUrl"
                name="img"
                size="small"
                :uploadSuccess="(val) => {this.uploadSuccess('bankCardBack', val)}"
              ></uploader>
            </div>
          </div>
        </group>
        <x-button 
          class="submit-btn" 
          text="提交审核" 
          @click.native="submit" 
          type="primary"
        ></x-button>
      </div>
    </div>
  </div>
</template>

<script>
import Uploader from 'components/uploader'
import IHeader from 'components/header/index.vue'
import { Group, XInput, XButton, Radio } from 'vux'
import { mobileReg } from 'util/reg'
import desensitization from 'util/desensitization'
import Qs from 'qs'
const rules = {
  // mobile: (val) => {
  //   return {
  //     result: mobileReg.test(val),
  //     errTips: !val ? '手机号不能为空' : '手机号格式有误'
  //   }
  // },
  // userName: (val) => {
  //   return {
  //     result: !!val,
  //     errTips: '真实姓名不能为空'
  //   }
  // },
  certPositive: (val) => {
    return {
      result: !!val,
      errTips: '身份证正面不能为空'
    }
  },
  certBack: (val) => {
    return {
      result: !!val,
      errTips: '身份证背面不能为空'
    }
  },
  bankCardPositive: (val) => {
    return {
      result: !!val,
      errTips: '银行卡正面不能为空'
    }
  },
  bankCardBack: (val) => {
    return {
      result: !!val,
      errTips: '银行卡背面不能为空'
    }
  }
}
export default {
  name: 'Identify',
  data () {
    return {
      allowLogin: false,
      certName: '', // 真实姓名
      // userName: '', // 姓名
      certNumber: '', // 身份证号
      // mobile: '', // 手机
      certPositive: '', // 身份证正面
      certBack: '', // 身份证背面
      bankCardPositive: '', // 银行卡正面
      bankCardBack: '', // 银行卡背面
      option: {
        text: '实名认证',
        style: 'orange',
        showBack: true
      },
      uploadUrl: '/file',
      previewUrl: ''
    }
  },
  components: {
    Uploader,
    Radio,
    Group,
    XInput,
    XButton,
    IHeader
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    // 提交
    submit () {
      if(!this.validate()) return
      this.$ajax({
        url : '/person/update',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
        },
        transformRequest: [(data) => {
          data = Qs.stringify(data)
          return data
        }],
        data: {
          // userName: this.userName,
          // mobile: this.mobile,
          certPositive: this.certPositive[0],
          certBack: this.certBack[0],
          bankCardPositive: this.bankCardPositive[0],
          bankCardBack: this.bankCardBack[0],
        },
        directAjax: true
      }).then(res => {
        if(res.success) {
          this.$vux.toast.text('提交成功，请耐心等待您的审核结果', 'default')
          setTimeout(() => {
            // 修改成功 跳转至来源页面
            this.$router.go(-1)
          }, 3000)
        }else {
          this.$vux.toast.text(res.errorMsg, 'default')
        }
      })
    },
    // 获取用户信息
    getInfo () {
      this.$ajax({
        url : '/person/detail',
        method: 'get',
        directAjax: true
      }).then(res => {
        this.$judgeLogin(res)
        if(res.success && res.data && res.data.target) {
          let { certNumber, certName } = res.data.target
          this.certName = desensitization(certName, 1, 0)
          this.certNumber = desensitization(certNumber, 4, 4)
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
    // 请求成功
    uploadSuccess (name, val) {
      this[name] = val
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.page-identify {
  .slider-bg {
    display: none;
  }
  &#app {
    .content-wrap {
      padding-top: 90px;
    }
  }
}
.identify-wrap {
  .upload-wrap {
    padding: 34px 0 40px;
    position: relative;
    &:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #D9D9D9;
      color: #D9D9D9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    &:last-child {
      border-top: none;
    }
    .upload-label {
      float: left;
      margin-left: 30px;
      color: #FF5500;
      font-size: 32px;
      margin-right: 30px;
    }
    .upload-item {
      float: left;
      margin-right: 32px;
      position: relative;
      border: 1px solid #D9D9D9;
      overflow: hidden;
      .weui-cell {
        padding: 0;
      }
      .upload-bg {
        width: 100%;
        position: absolute;
        left: 0;
        top: 20px;
        color: #FF5000;
        font-size: 24px;
        text-align: center;
        img {
          width: 56px;
          height: 56px;
        }
      }
    }
  }
  .weui-uploader__bd {
    width: 200px!important;
    height: 136px!important;
    margin-right: 0!important;
  }
  .weui-uploader__input-box.remove {
    position: absolute!important;
    right: 0;
    top: 0;
    z-index: 11;
    background: #fff;
    width: 40px!important;
    height: 40px!important;
    &::before, &::after {
      display: inline-block;
      width: 20px!important;
      height: 1PX!important;
      background: #999;
      top: 19px;
      left: 11px;
      transform: translate(0);
      transform: rotate(45deg);
    }
    &::before {
      transform: rotate(-45deg)!important;
    }
  }
  .weui-uploader__files {
    width: 200px!important;
    height: 136px!important;
    position: absolute;
    left: 0;
    top: 0;
    .weui-uploader__file {
      width: 100%!important;
      height: 100%!important;
      background-size: 100% 100%;
    }
  }
  .weui-uploader__input-box {
    width: 200px!important;
    height: 136px!important;
    margin: 0!important;
    border: none!important;
    display: inline-block;
    // &::before, &::after {
    //   display: none;
    // }
    &::before {
      width: 1PX!important;
    }
    &::after {
      height: 1PX!important;
    }
  }
  .preview-img {
    width: 200px!important;
    height: 136px!important;
  }
  .submit-btn {
    margin-top: 30px;
  }
}
.vux-loading {
  display: none;
}
</style>
