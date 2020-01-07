<template>
  <div class="product-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap" ref="list">
      <div class="product-sort">
        <div class="sort-left">
          <span>排序</span>
          <i v-if="sort != 'up'" class="down" @click="sortAction"></i>
          <i v-if="sort == 'up'" class="up" @click="sortAction"></i>
        </div>
        <div class="sort-right">
          <span>筛选</span>
          <img src="./images/sort.png" />
        </div>
      </div>
      <div class="product-list">
        <div 
          v-if="productList.length"
          class="product" 
          v-for="(item, index) in productList" 
          :key="index" 
          @click="productClick(item.id, item.name)"
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
      </div>
      <div class="no-data" v-if="!productList.length">
        暂无产品～
      </div>
      <div class="no-data" v-if="productList.length">
        没有更多了～
      </div>
    </div>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
import { moneyTransform } from 'util/data'
export default {
  name: 'Product',
  data () {
    return {
      sort: 'down',
      page: 1,
      total: 2,
      option: {
        text: '产品列表',
        showLogo: false,
        showBack: true,
        style: 'orange'
      },
      productList: []
    }
  },
  components: {
    IHeader
  },
  mounted () {
    this.queryList()
    this.addScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollFn)
  },
  methods: {
    // 监听scroll 触底加载
    addScroll () {
      window.addEventListener('scroll', this.scrollFn)
    },
    // 滚动事件
    scrollFn () {
      let heightWindow = document.documentElement.clientHeight || 
        document.body.clientHeight
      let list = this.$refs.list.getBoundingClientRect()
      if(-list.top + heightWindow + 100 >= list.height) {
        this.loading = true
        if(this.page >= this.total) {
          this.loadingText = '没有更多了~'
        }else {
          this.page ++
          this.loadingText = '加载中...'
          this.queryList()
        }
      }
    },
    transWan (num) {
      return moneyTransform(num, 'wan')
    },
    // 排序 
    sortAction () {
      this.sort = this.sort == 'down' ? 'up' : 'down'
    },
    // 跳转产品详情
    productClick (id, name) {
      this.$router.push({path: '/product-detail', query: {
        id,
        name
      }})
    },
    // 请求产品列表
    queryList () {
      this.$ajax({
        // 临时
        url : '/loan/getProducts',
        method: 'post',
        data: {
          page: this.page,
          size: 5
        },
        directAjax: true
      }).then(res => {
        // this.$judgeLogin(res)
        if(res.success && res.data && res.data.target) {
          this.total = res.data.target.totalPage
          this.productList = this.productList.concat(res.data.target.result)
        }
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
#app.page-product {
  .slider-bg {
    display: none;
  }
  .content-wrap {
    margin: 0 30px 30px 30px;
  }
}
.product-wrap {
  .product-sort {
    font-size: 24px;
    color: #4A4A4A;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    padding: 20px 0;
    .sort-left {
      flex: 1;
      text-align: left;
      span {
        margin: 0 20px;
      }
      i {
        vertical-align: middle;
        display: inline-block;
        position: relative;
        width: 26px;
        height: 26px;
        border: 1PX solid #FF9D20;
        &::after {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          border-right: 2PX solid #FF9D20;
          border-bottom: 2PX solid #FF9D20;
          position: absolute;
          left: 5px;
          top: 3px;
          transform: rotate(45deg);
          transition: all 200ms;
        }
        &.up {
          &::after {
            transform: rotate(-135deg);
            top: 8px;
          }
        }
      }
    }
    .sort-right {
      flex: 1;
      text-align: right;
      position: relative;
      img {
        width: 26px;
        height: 26px;
        vertical-align: middle;
        margin: 0 20px;
      }
      span {
        vertical-align: middle;
      }
      &::before {
        content: '';
        display: inline-block;
        width: 1PX;
        height: 40px;
        background: #D8D8D8;
        position: absolute;
        right: 150px;
        top: -3px;
      }
    }
  }
  .product-list {
    margin-top: 24px;
    border-radius: 8px;
    background: #fff;
    .product {
      padding: 0 24px;
      &:last-child {
        .product-detail {
          border-bottom: none;
        }
      }
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
  }
  .loading {
    text-align: center;
    color: #999;
    padding: 15px 0;
  }
}
</style>
