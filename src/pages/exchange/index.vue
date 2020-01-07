<template>
  <div class="exchange-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="product-dec">
        <img class="prod-img" :src="image"/>
        <p class="desc">
          {{name}}
        </p>
      </div>
      <div class="bottom-part">
        <div class="quantity-select">
          <div class="left">数量</div>
          <div class="right">
            <a class="handle-btn" @click="reduce">-</a>
            <em class="number">{{quantity}}</em>
            <a class="handle-btn" @click="add">+</a>
          </div>
        </div>
        <x-button 
          class="apply-btn" 
          text="兑换" 
          @click.native="openValidate" 
          type="primary"
        ></x-button>
      </div>
    </div>
    <x-dialog dialog-transition="0" v-model="showValidate" class="validate-dialog">
      <div class="validate-wrap">
        <div class="vux-close" @click="showValidate=false">
          +
        </div>
        <group>
          <msg-code
            opType="SCOREEXCHG"
            :msgCodeChange="msgCodeChange"
          >
          </msg-code>
        </group>
        <x-button 
          :disabled="!allowSubmit"
          class="validate-btn" 
          text="验证" 
          @click.native="validate" 
          type="primary"
        ></x-button>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
import MsgCode from 'components/msg-code/index.vue'
import { XButton, XDialog, Group } from 'vux'
export default {
  name: 'Exchange',
  data () {
    return {
      option: {
        text: '积分兑换',
        showLogo: false,
        showBack: true,
        style: 'orange'
      },
      id: '', // 商品id
      name: '',
      image: '',
      detail: {},
      quantity: 1, // 兑换数量
      showValidate: false, // 是否展示验证弹窗
      mobile: '', 
      code: '',
      allowSubmit: false
    }
  },
  components: {
    IHeader,
    XButton,
    XDialog,
    MsgCode,
    Group
  },
  mounted () {
    this.queryDetail()
    let { query: { id, name, image } } = this.$router.history.current
    this.commodityId = id
    this.name = name
    this.image = image
  },
  methods: {
    // 请求产品列表
    queryDetail () {
      this.$ajax({
        // 临时
        url : '/loan/getProducts',
        method: 'post',
        data: {
        },
        directAjax: true
      }).then(res => {
        this.$judgeLogin(res)
        if(res.success && res.data && res.data.target) {
          this.product = res.data.target
        }
      })
    },
    // 验证码变化
    msgCodeChange (args) {
      let { code, phone, id, allowSubmit } = args
      this.code = code
      this.mobile = phone
      this.id = id
      this.allowSubmit = allowSubmit
    },
    // 弹出验证码框
    openValidate () {
      this.showValidate = true
    },
    // 立即申请
    exchange () {
      this.$ajax({
        url : '/exchange/exchange',
        method: 'post',
        params: {
          commodityId: this.commodityId,
          number: this.quantity
        },
        directAjax: true
      }).then(res => {
        this.$judgeLogin(res)
        if(res.success) {
          this.$vux.toast.text('恭喜您，兑换成功！')
          this.showValidate = false
          setTimeout(() => {
            // 跳转兑换列表
            this.$router.push({path: '/exchange-list'})
          })
        }else {
          this.$vux.toast.text(res.errorMsg)
        }
      })
    },
    // 验证
    validate () {
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
        this.$judgeLogin(res)
        if(res.success) {
          // 验证成功 申请兑换
          this.exchange()
        }else {
          this.$vux.toast.text(res.errorMsg, 'default')
        }
      })
    },
    // 增加
    add () {
      this.quantity ++
    },
    // 减少
    reduce() {
      if(this.quantity == 1) {
        this.$vux.toast.text('数量不能再减少了哦', 'default')
      }else {
        this.quantity --
      }
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.page-exchange {
  .slider-bg {
    display: none;
  }
}
.exchange-wrap {
  .prod-img {
    height: 500px;
    margin-bottom: 40px;
  }
  .prod-desc {
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    overflow:hidden;
  }
  .quantity-select {
    background: #FFFFFF;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.16);
    border-radius: 4px;
    font-size: 28px;
    color: #4A4A4A;
    display: flex;
    padding: 26px 40px;
    .left {
      flex: 1;
      text-align: left;
      padding-top: 12px;
    }
    .right {
      width: 250px;
      .handle-btn {
        width: 50px;
        height: 56px;
        line-height: 56px;
        display: inline-block;
        vertical-align: middle;
      }
      .number {
        margin: 0 16px;
        background: #F6F6F6;
        border: 1PX solid #979797;
        border-radius: 4px;
        display: inline-block;
        width: 96px;
        height: 56px;
        line-height: 56px;
        text-align: center;
        vertical-align: middle;
      }
    }
  }
  .bottom-part {
    position: fixed;
    width: 96%;
    left: 2%;
    bottom: 20px;
  }
  .apply-btn {
    width: 100%;
    margin-top: 16px;
  }
}
.validate-dialog {
  overflow: hidden;
  .weui-dialog {
    overflow: visible;
    transform: translate(0,0);
    width: 600px;
    max-width: 600px;
    margin-left: -300px;
    margin-top: -200px;
  }
  .validate-wrap {
    background: #FFFFFF;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.16);
    border-radius: 8px;
    padding: 40px 0;
    text-align: center;
    .weui-cells {
      .vux-x-input, .vux-selector {
        .weui-label {
          font-size: 26px;
          width: 96px!important;
          text-align: justify;
          text-align-last: justify;
        }
        .weui-input {
          font-size: 26px;
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
          font-size: 26px;
        }
      }
    }
    .validate-btn {
      font-size: 26px;
      width: 150px;
      height: 50px;
      line-height: 50px;
      margin-top: 30px;
    }
    .weui-btn_mini {
      padding: 0 20px;
    }
  }
}
.vux-close {
  position: absolute;
  display: inline-block;
  vertical-align: middle;
  color: #999;
  width: 50px;
  height: 50px;
  right: 0;
  top: 0;
  font-size: 45px;
  transform: rotate(45deg);
}
</style>
