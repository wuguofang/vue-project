<template>
  <div class="exchange-list-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap" ref="list">
      <div class="exchange-list">
        <div v-if="exchangeList.length" class="exchange-item" v-for="(item, index) in exchangeList" :key="index">
          <img :src="item.image" class="prod-img"/>
          <div class="prod-detail">
            <p class="prod-desc">
              {{item.name}}
            </p>
            <span class="credit-label">
              所需积分
            </span>
            <em class="credit-mount">{{item.useScore}}</em>
            <a class="exchange-btn">
              <img src="./images/done.png" />
              <span>已兑换</span>
            </a>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="!exchangeList.length">
        暂无兑换记录～
      </div>
      <div class="no-data" v-if="exchangeList.length">
        没有更多了～
      </div>
    </div>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
export default {
  name: 'Product',
  data () {
    return {
      sort: 'down',
      page: 1,
      total: 2,
      loading: false, // 是否展示下拉列表加载中
      loadingText: '没有更多了～',
      option: {
        text: '兑换记录',
        showLogo: false,
        showBack: true,
        style: 'orange'
      },
      exchangeList: []
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
          this.loadingText = '没有更多了'
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
    // 请求兑换列表
    queryList () {
      this.$ajax({
        url : '/exchange/getExchanges',
        method: 'post',
        data: {
          page: this.page,
          size: 10
        },
        directAjax: true
      }).then(res => {
        this.$judgeLogin(res)
        if(res.success && res.data && res.data.target) {
          this.exchangeList = this.exchangeList.concat(res.data.target.result)
        }
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
#app.page-exchangelist {
  .slider-bg {
    display: none;
  }
  .content-wrap {
    padding-bottom: 30px;
  }
}
.exchange-list-wrap {
  text-align: left;
  .exchange-list {
    margin-top: 24px;
    .exchange-item {
      background: #fff;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
      overflow: hidden;
      display: flex;
      .prod-img {
        width: 192px;
        height: 192px;
        margin-right: 32px;
      }
      .prod-detail {
        color: #4A4A4A;
        height: 192px;
        flex: 1;
        .prod-desc {
          font-size: 28px;
          font-weight: bold;
          height: 80px;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          overflow:hidden;
        }
        .credit-label {
          font-size: 24px;
          display: block;
          margin: 16px 0;
        }
        .credit-mount {
          font-size: 40px;
          color: #FF5000;
          font-weight: bold;
        }
        .exchange-btn {
          float: right;
          font-size: 32px;
          color: #4A4A4A;
          text-align: center;
          img {
            width: 33px;
            height: 33px;
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
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
