<template>
  <div class="index-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <swiper :list="bannerList" dots-position="center"></swiper>
      <div class="product-list">
        <border-title text="产品介绍">
          <img class="more-prod" src="./images/more.png" @click="goMore" />
        </border-title>
        <div class="product"
          v-if="productList.length" 
          v-for="(item, index) in productList" 
          :key="index" 
          @click="productClick(item.id , item.name)"
        >
          <div class="product-detail">
            <img class="product-pic" :src="item.image" />
            <div class="product-desc">
              <p class="line-one">
                <span class="left">
                  {{item.name}}
                </span>
                <span class="right">
                  {{item.type}}
                </span>
              </p>
              <p class="line-two">
                <span class="left">
                  <em>{{transWan(item.productLimit)}}</em>万
                </span>
                <span class="right">
                  {{item.repayType}}
                </span>
              </p>
              <p class="line-three">
                <span class="left">
                  最高可贷
                </span>
                <span class="middle">
                  {{item.synopsis}}
                </span>
                <span class="right">
                  <img src="./images/fire.png" />
                  <img src="./images/fire.png" />
                  <img src="./images/fire.png" />
                  <img src="./images/fire.png" />
                  <img src="./images/fire.png" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="no-data" v-if="productList.length">
          没有更多了～
        </div>
        <div class="no-data" v-if="!productList.length">
          暂无产品～
        </div>
      </div>
    </div>
    <i-tab></i-tab>
  </div>
</template>

<script>
import { Swiper } from 'vux'
import IHeader from 'components/header/index.vue'
import ITab from 'components/tab/index.vue'
import BorderTitle from 'components/border-title/index.vue'
import { moneyTransform } from 'util/data'
export default {
  name: 'Index',
  data () {
    return {
      option: {
        text: '掌柜无忧',
        showLogo: true,
        style: 'orange'
      },
      bannerList: [
        {
          url: 'javascript:',
          img: require('./images/slider1.png'),
          title: '送你一朵fua'
        }
      ],
      productList: [
      ]
    }
  },
  components: {
    IHeader,
    Swiper,
    ITab,
    BorderTitle
  },
  mounted () {
    this.queryList()
  },
  methods: {
    // 跳转更多产品
    goMore () {
      this.$router.push({path: '/product'})
    },
    transWan (num) {
      return moneyTransform(num, 'wan')
    },
    // 跳转产品详情
    productClick (id, name) {
      this.$router.push({path: '/product-detail', query: {
        id,
        name
      }})
    },
    // 请求产品列表 首页仅展示五条
    queryList () {
      this.$ajax({
        // 临时
        url : '/loan/getProducts',
        method: 'post',
        data: {
          page: 1,
          size: 5
        },
        directAjax: true
      }).then(res => {
        if(res.success && res.data && res.data.target) {
          this.productList = res.data.target.result
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.index-wrap {
  .vux-swiper {
    height: 320px!important;
    .vux-swiper-item > a > .vux-img {
      border-radius: 4PX;
    }
  }
  .vux-slider > .vux-indicator {
    display: none;
  }
  .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc {
    display: none;
  }
  .vux-slider > .vux-indicator > a > .vux-icon-dot,
  .vux-slider .vux-indicator-right > a > .vux-icon-dot {
    background: #fff;
  }
  .vux-slider > .vux-indicator > a > .vux-icon-dot.active,
  .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
    background: #FF6A2F;
    border-radius: 8px;
    width: 40px;
    height: 16px;
    opacity: 1;
  }
  .product-list {
    margin-top: 24px;
    .more-prod {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      float: right;
    }
    .product-detail {
      border-bottom: 1PX solid #E9E9E9;
      text-align: left;
      display: flex;
      color: #9B9B9B;
      font-size: 22px;
      padding: 20px 0;
      .product-pic {
        width: 120px;
        height: 120px;
        margin-right: 20px;
      }
      .product-desc {
        flex: 1;
        padding-left: 20px;
      }
      .line-one {
        .left {
          color: #4A4A4A;
          font-size: 24px;
          font-weight: bold;
        }
        .right {
          padding: 3px 0;
          color: #3D91ED;
          font-size: 24px;
          float: right;
          &::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #3D91ED;
            border-radius: 50%;
            position: relative;
            bottom: 6px;
          }
        }
      }
      .line-two {
        margin: 6px 0;
        .left {
          color: #FF6A2F;
          font-size: 20px;
          em {
            font-size: 32px;
            font-weight: bold;
          }
        }
        .right {
          padding: 3px 0;
          color: #FF9D20;;
          font-size: 24px;
          float: right;
          &::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #FF9D20;;
            border-radius: 50%;
            position: relative;
            bottom: 6px;
          }
        }
      }
      .line-three {
        display: flex;
        .left {
          flex: 1;
        }
        .middle {
          flex: 1;
        }
        .right {
          flex: 1;
          text-align: right;
          img {
            width: 21px;
            height: 26px;
          }
        }
      }
    }
    .product {
      padding: 0 24px;
      background: #fff;
      &:last-child {
        .product-detail {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
