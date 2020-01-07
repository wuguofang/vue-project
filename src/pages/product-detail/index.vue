<template>
  <div class="product-detail-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <div class="no-data">功能开发中，敬请期待...</div>
      <x-button 
        class="apply-btn" 
        text="立即申请"
        disabled 
        @click.native="apply" 
        type="primary"
      ></x-button>
    </div>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
import { XButton } from 'vux'
export default {
  name: 'ProductDetail',
  data () {
    return {
      option: {
        text: '',
        showLogo: false,
        showBack: true,
        style: 'orange'
      },
      id: '', // 产品id
      product: {}
    }
  },
  components: {
    IHeader,
    XButton
  },
  mounted () {
    this.queryDetail()
    let { query } = this.$router.history.current
    this.id = query.id
    this.option.text = query.name
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
    // 立即申请
    apply () {
      this.$router.push({
        path: '/apply', 
        query: { id: this.id }
      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.page-productdetail {
  .slider-bg {
    display: none;
  }
}
.product-detail-wrap {
  .apply-btn {
    position: fixed;
    bottom: 20px;
    width: 80%;
    left: 10%;
  }
}
</style>
