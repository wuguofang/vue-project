<template>
  <div class="img-code-wrap">
    <div class="left">
      <x-input 
        title="验证码" 
        v-model="imgCode" 
        placeholder="请输入图形验证码"
        ref="imgCode"
        @on-change="change"
      >
      </x-input>
    </div>
    <div class="right">
      <img class="img-code" :src="imgUrl" @click="refresh" />
    </div>
  </div>
</template>

<script>
import { XInput } from 'vux'
export default {
  name: 'imgcode',
  props: {
    imgCodeChange: {
      default: function () {
        return {
        }
      }
    },
    userName: '',
    needRefresh: {
      default: function () {
        return false
      }
    }
  },
  data () {
    return {
      imgCode: '', // 图形验证码输入内容
      imgUrl: '', // 图形验证码url
    }
  },
  components: {
    XInput
  },
  mounted () {
    this.refresh()
  },
  watch: {
    // 监听到需要刷新则刷新
    needRefresh: {
      handler(newVal) {
        if(newVal) {
          this.refresh()
        }
      }
    }
  },
  methods: {
    // 变化回调
    change () {
      this.imgCodeChange && this.imgCodeChange({
        imgCode: this.imgCode,
        key: this.key
      })
    },
    // 刷新验证码
    refresh () {
      // 生成key
      this.generateKey()
      // 输入框聚焦
      this.$refs.imgCode.focus()
      // 输入框清空
      this.imgCode = ''
      // 生成验证码
      this.$ajax({
        url : '/imagecode/generate',
        method: 'post',
        responseType: 'arraybuffer',
        params: {
          key: this.key
        },
        directAjax: true
      }).then(res => {
        if(res.success && res.data) {
          this.imgUrl = this.toUrl(res.data)
        }else {
          this.$vux.toast.text(res.errorMsg, 'default')
        }
      })
    },
    toUrl (res) {
      return 'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
    },
    // 生成唯一标志
    generateKey () {
      this.key = '' + this.userName + new Date().getTime()
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.img-code-wrap {
  display: flex;
  position: relative;
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  .left {
    flex: 1;
  }
  .right {
    width: 200px;
    position: relative;
  }
  .img-code {
    width: 150px;
    height: 50px;
    position: absolute;
    top: 50%;
    margin-top: -25px;
    right: 20px;
  }
}
</style>
