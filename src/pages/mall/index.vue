<template>
  <div class="mall-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap" ref="list">
      <pannel-title text="积分商城"/>
      <ul class="tab-list">
        <li>
          <img src="./images/credit.png" />
          <div class="desc" @click="goScore">
            当前积分
            <em>{{credit}}</em>
          </div>
        </li>
        <li @click="goList">
          <img src="./images/record.png" />
          <div class="desc">兑换记录</div>
        </li>
      </ul>
      <div class="credit-list">
        <div class="credit-item" v-for="(item, index) in prodList" :key="index">
          <img :src="item.image" />
          <div class="prod-detail">
            <p class="prod-desc">
              {{item.name}}
            </p>
            <span class="credit-label">
              所需积分
            </span>
            <em class="credit-mount">{{item.scorePrice}}</em>
            <a class="exchange-btn" @click="exchange(item)">兑换</a>
          </div>
        </div>
        <div class="no-data" v-if="prodList.length">
          没有更多了～
        </div>
        <div class="no-data" v-if="!prodList.length">
          暂无兑换商品～
        </div>
      </div>
    </div>
    <i-tab></i-tab>
  </div>
</template>

<script>
import ITab from 'components/tab/index.vue'
import IHeader from 'components/header/index.vue'
import PannelTitle from 'components/pannel-title/index.vue'
export default {
  name: 'Mall',
  data () {
    return {
      option: {
        text: '掌柜无忧',
        showLogo: true,
        style: 'orange'
      },
      total: 2,
      page: 1,
      loadingText: '加载中...',
      loading: false, // 是否展示下拉列表加载中
      credit: 0, // 用户当前积分
      prodList: []
    }
  },
  components: {
    ITab,
    IHeader,
    PannelTitle
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
    // 请求剩余积分
    queryCredit () {
      this.$ajax({
        url : '/score/getBalance',
        method: 'get',
        directAjax: true,
        params: {
        }
      }).then(res => {
        this.$judgeLogin(res)
        if(res.success && res.data) {
          this.credit = res.data.target
        }
      })
    },
    // 请求商品列表
    queryList () {
      this.$ajax({
        url : '/commodity/getCommondities',
        method: 'post',
        directAjax: true,
        data: {
          page: this.page,
          size: 5
        }
      }).then(res => {
        this.$judgeLogin(res)
        if(res.success && res.data && res.data.target) {
          this.total = res.data.target.totalPage
          this.prodList = this.prodList.concat(res.data.target.result)
        }
        this.loading = false
      })
    },
    // 兑换
    exchange (item) {
      let { id, name, image } = item
      this.$router.push({
        path: '/exchange', 
        query: { 
          id,
          name,
          image
        }
      })
    },
    // 兑换记录页面
    goList () {
      this.$router.push({
        path: '/exchange-list'
      })
    },
    // 跳转积分明细页面
    goScore () {
      this.$router.push({
        path: '/score-list'
      })
    }
  },
  mounted () {
    this.queryCredit()
    this.queryList()
    this.addScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollFn)
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.mall-wrap {
  text-align: left;
  .tab-list {
    text-align: center;
    background: #fff;
    display: flex;
    margin-top: 28px;
    li {
      flex: 1;
      list-style: none;
      color: #FF5000;
      padding: 28px 0;
      img {
        width: 66px;
        height: 66px;
        margin: 10px 30px 0 62px;
        float: left;
      }
      .desc {
        float: left;
        text-align: left;
      }
      &:first-child {
        position: relative;
        .desc {
          margin-top: 8px;
          em {
            font-weight: bold;
            display: block;
            font-size: 40px;
          }
        }
        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 34px;
          height: 80px;
          background: #D8D8D8;
          width: 1PX;
          display: inline-block;
        }
      }
      &:last-child {
        .desc {
          font-weight: bold;
          margin-top: 24px;
        }
      }
    }
  }
  .credit-list {
    margin-top: 24px;
    .credit-item {
      background: #fff;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
      overflow: hidden;
      display: flex;
      img {
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
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
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
          border-radius: 80px;
          color: #fff;
          width: 120px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          background-image: linear-gradient(-135deg, #FF9D20 0%, #FF5000 100%);
        }
      }
    }
    .loading {
      text-align: center;
      color: #999;
      padding: 8px 0;
    }
  }
}
</style>
