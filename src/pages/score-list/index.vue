<template>
  <div class="score-list-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap" ref="list">
      <ul class="score-list">
        <li v-for="(item, index) in scoreList" :key="index">
          <div class="record-detail">
            <div class="line-one">
              <span class="left" v-if="item.income != 0">
                收入<em> {{Math.abs(item.income)}}</em> 积分
              </span>
              <span class="left" v-if="item.expense != 0">
                支出<em> {{Math.abs(item.expense)}}</em> 积分
              </span>
              <span class="right">
                
              </span>
            </div>
            <div class="line-two">
              <span class="left">
                {{item.memo || '--'}}
              </span>
              <span class="right">
                {{formatDate(item.createTime)}}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div class="no-data" v-if="!scoreList.length">
        暂无积分明细～
      </div>
      <div class="no-data" v-if="scoreList.length">
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
        text: '积分明细',
        showLogo: false,
        showBack: true,
        style: 'orange'
      },
      scoreList: []
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
    // 单位
    transWan (num) {
      return moneyTransform(num, 'wan')
    },
    // 格式化日期 时间戳 or 20191221格式
    formatDate (dates) {
      let date = new Date(dates)
      return `${date.getFullYear()}-${this.addZero(date.getMonth() + 1)}-${this.addZero(date.getDate())}`
    },
    // 补零
    addZero (num) {
      return num < 10 ? '0' + num : num
    },
    // 排序 
    sortAction () {
      this.sort = this.sort == 'down' ? 'up' : 'down'
    },
    // 请求兑换列表
    queryList () {
      this.$ajax({
        url : '/score/getScores',
        method: 'get',
        params: {
          page: this.page,
          size: 10
        },
        directAjax: true
      }).then(res => {
        this.$judgeLogin(res)
        if(res.success && res.data && res.data.target) {
          this.scoreList = this.scoreList.concat(res.data.target.result)
        }
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
#app.page-scorelist {
  .slider-bg {
    display: none;
  }
  .content-wrap {
    padding-bottom: 30px;
  }
}
.score-list-wrap {
  text-align: left;
  .score-list {
    li {
      list-style: none;
      padding: 24px;
      border-bottom: 1PX solid #E9E9E9;
      background: #fff;
      overflow: hidden;
      img {
        width: 80px;
        height: 80px;
        margin-right: 24px;
        float: left;
      }
      .record-detail {
        .line-one {
          margin-bottom: 6px;
          .left {
            font-size: 20px;
            color: #4A4A4A;
            em {
              font-size: 28px;
              color: #FF9D20;
            }
          }
          .right {
            float: right;
            color: #999;
            font-size: 24px;
          }
        }
        .line-two {
          color: #999;
          font-size: 24px;
          .right {
            float: right;
            margin-top: -20px;
          }
        }
        &.record-detail-2 {
          .line-one {
            margin-top: 22px;
          }
        }
      }
    }
    &.done-product-list {
      li {
        display: flex;
        img {
          float: none;
        }
        .record-detail {
          flex: 1;
          .line-one {
            .right {
              float: right;
              color: #000000;
              font-size: 28px;
              em {
                color: #FF5500;
              }
            }
          }
        }
        .right-btn {
          width: 200px;
          text-align: right;
          a {
            margin-top: 15px;
            display: inline-block;
            text-align: center;
            width: 136px;
            height: 48px;
            line-height: 48px;
            background-image: linear-gradient(-135deg, #FF9D20 0%, #FF5000 100%);
            border-radius: 24px;
            color: #fff;
            font-size: 26px;
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
