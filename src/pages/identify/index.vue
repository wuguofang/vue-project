<template>
  <div>
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="identify-wrap">
        <group>
          <x-input title="真实姓名" placeholder="请输入真实姓名" v-model="name">
          </x-input>
          <x-input title="证件号码" placeholder="请输入证件号码" v-model="certNo">
          </x-input>
          <div class="upload-wrap clearfix">
            <div class="upload-label">上传照片</div>
            <div class="upload-item">
              <uploader
                title=""
                :showHeader="false"
                :max="1"
                upload-url="uploadUrl"
                name="img"
                size="small"
              ></uploader>
            </div>
            <div class="upload-item">
              <uploader
                title=""
                :showHeader="false"
                :max="1"
                upload-url="uploadUrl"
                name="img"
                size="small"
              ></uploader>
            </div>
          </div>
          <x-input title="手机号码" placeholder="请输入手机号码" v-model="phone">
          </x-input>
          <x-input title="银行卡号" placeholder="请输入银行卡号" v-model="bankNo">
          </x-input>
        </group>
        <x-button class="submit-btn" text="确定" :disabled="!allowLogin" @click.native="login" type="primary"></x-button>
      </div>
    </div>
  </div>
</template>

<script>
import Uploader from 'vux-uploader'
import IHeader from 'components/header/index.vue'
import { Group, XInput, XButton, Radio } from 'vux'
export default {
  name: 'Identify',
  data () {
    return {
      certType: ['二代身份证'],
      name: '',
      certNo: '',
      phone: '',
      bankNo: '',
      option: {
        text: '实名认证',
        style: 'orange',
        showBack: true
      }
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
  methods: {
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.identify-wrap {
  padding: 0 30px;
  .upload-wrap {
    padding: 28px 0;
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
      .weui-cell {
        padding: 0;
      }
    }
  }
  .weui-uploader__input-box {
    width: 224px!important;
    height: 136px!important;
    margin: 0!important;
  }
  .submit-btn {
    margin-top: 30px;
  }
}
</style>
