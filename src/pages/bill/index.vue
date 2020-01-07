<template>
  <div class="bill-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap" ref="list">
      <pannel-title text="掌柜的账簿" />
      <div class="tab-scroll">
        <!-- <scroller lock-y :scrollbar-x=false> -->
          <ul class="box">
            <li @click="tabClick(1)" :class="active == 1 ? 'active' : ''">
              <div class="bg">
                <img src="./images/topay.png" />
                <span>未还账单</span>
              </div>
            </li>
            <li @click="tabClick(2)" :class="active == 2 ? 'active' : ''">
              <div class="bg">
                <img src="./images/record.png" />
                <span>还款记录</span>
              </div>
            </li>
            <!-- <li @click="tabClick(3)" :class="active == 3 ? 'active' : ''">
              <div class="bg">
                <img src="./images/paied.png"/>
                <span>已还账单</span>
              </div>
            </li>
            <li @click="tabClick(4)" :class="active == 4 ? 'active' : ''">
              <div class="bg">
                <img src="./images/product.png"/>
                <span>还款订单</span>
              </div>
            </li> -->
          </ul>
          <ul class="box">
            <!-- <li @click="tabClick(1)" :class="active == 1 ? 'active' : ''">
              <div class="bg">
                <img src="./images/topay.png" />
                <span>未还账单</span>
              </div>
            </li>
            <li @click="tabClick(2)" :class="active == 2 ? 'active' : ''">
              <div class="bg">
                <img src="./images/record.png" />
                <span>还款记录</span>
              </div>
            </li> -->
            <li @click="tabClick(3)" :class="active == 3 ? 'active' : ''">
              <div class="bg">
                <img src="./images/paied.png"/>
                <span>已还账单</span>
              </div>
            </li>
            <li @click="tabClick(4)" :class="active == 4 ? 'active' : ''">
              <div class="bg">
                <img src="./images/product.png"/>
                <span>还款订单</span>
              </div>
            </li>
          </ul>
        <!-- </scroller> -->
      </div>
      <border-title :text="title" />
      <ul class="record-list" v-if="recordList.length && active != 4">
        <li v-for="(item, index) in recordList" :key="index">
          <img v-if="item.repayType == 'MANUAL'" src="./images/man.png" />
          <img v-if="item.repayType != 'MANUAL'" src="./images/auto.png" />
          <div class="record-detail" v-if="active != 2">
            <div class="line-one">
              <span class="left">
                {{item.dates ? getMonth(item.dates) : '--'}}月账单
              </span>
              <span class="right">
                ¥<em>{{transYuan(item.amount)}}</em>
              </span>
            </div>
            <div class="line-two">
              <span class="left">
                {{formatDate(item.dates)}}
              </span>
              <span class="right">
                {{item.repayed == '0' ? '未还款' : '已还款'}}
              </span>
            </div>
          </div>
          <div class="record-detail record-detail-2" v-if="active == 2">
            <div class="line-one">
              <span class="left">
                {{formatDate(item.repayTime, true)}}
              </span>
              <span class="right">
                ¥<em>{{transYuan(item.amount)}}</em>
              </span>
            </div>
          </div>
        </li>
      </ul>
      <ul class="record-list done-product-list" v-if="recordList.length && active == 4">
        <li v-for="(item, index) in recordList" :key="index">
          <img v-if="item.repayType == 'MANUAL'" src="./images/man.png" />
          <img v-if="item.repayType != 'MANUAL'" src="./images/auto.png" />
          <div class="record-detail">
            <div class="line-one">
              <span class="left">
                {{item.platformRate || item.platformRate == 0 ? '服务费费率' : '服务费'}}
              </span>
              <span class="right">
                已还{{item.repayedCount || '--'}}期
              </span>
            </div>
            <div class="line-two">
              <span class="left">
                {{item.platformRate || item.platformRate == 0 ? `年化${item.platformRate}%` : `¥${transYuan(item.platformAmount)}`}}
              </span>
              <span class="right">
                未还{{(item.totalRepayTimes - item.repayedCount) || '--'}}期
              </span>
            </div>
          </div>
          <div class="right-btn" id="downloadWrap">
            <a @click="() => lookProtocal(item.loanId)">查看协议</a>
          </div>
        </li>
      </ul>
      <div class="no-data" v-if="!recordList.length">
        暂无记录～
      </div>
      <div class="no-data" v-if="recordList.length">
        没有更多了～
      </div>
    </div>
    <i-tab></i-tab>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
import ITab from 'components/tab/index.vue'
import PannelTitle from 'components/pannel-title/index.vue'
import BorderTitle from 'components/border-title/index.vue'
import { moneyTransform } from 'util/data'
import { Scroller } from 'vux'
const TABMAP = {
  '1': {
    title: '未还账单',
    api: '/plan/getPlans',
    method: 'post',
    params: {
      state: 'INIT'
    }
  },
  '2': {
    title: '还款记录',
    api: '/plan/getRepays',
    method: 'post',
  },
  '3': {
    title: '已还账单',
    api: '/plan/getPlans',
    method: 'post',
    params: {
      state: 'SUCCESS'
    }
  },
  '4': {
    title: '还款订单',
    api: '/loan/get_loans',
    method: 'get',
    params: {
      checkState: 'CHECKED'
    }
  }
}
export default {
  name: 'Index',
  data () {
    return {
      active: 1, // 当前选中tab
      title: TABMAP[1].title, // 当前title
      option: {
        text: '掌柜无忧',
        style: 'orange',
        showLogo: true
      },
      recordList: [],
      total: 2,
      page: 1,
      pdfSrc: '',
    }
  },
  components: {
    IHeader,
    ITab,
    PannelTitle,
    BorderTitle,
    Scroller
  },
  methods: {
    // 切换选择
    tabClick (active) {
      this.active = active
      this.title = TABMAP[active].title
      this.recordList = []
      this.total = 2
      this.page = 1
      this.queryList(active)
    },
    // 请求列表
    queryList (active) {
      active = active || this.active
      let { api, method, params = {} } = TABMAP[active]
      this.$ajax({
        url : api,
        method: method || 'post',
        data: {
          page: this.page,
          size: 10,
          ...params
        },
        directAjax: true
      }).then(res => {
        this.$judgeLogin(res)
        if(res.success && res.data && res.data.target) {
          this.total = res.data.target.totalPage
          this.recordList = this.recordList.concat(res.data.target.result)
        }
      })
    },
    // 查看协议
    lookProtocal (loanId) {
      this.$ajax({
        url : '/pdf',
        method: 'get',
        responseType: 'blob',
        params: {
          loanId
        },
        directAjax: true
      }).then(res => {
        this.$judgeLogin(res)
        if(res.success && res.data) {
          this.previewOrDownload(res.data)
        }else {
          this.$vux.toast.text(res.errorMsg, 'default')
        }
      })
    },
    // 预览（浏览器不支持预览则下载）
    previewOrDownload (res) {
      const blob = new Blob([res], { type: "application/pdf" })
      // 兼容不同浏览器的URL对象
      const url = window.URL || window.webkitURL || window.moxURL
      // 创建下载链接
      const downloadUrl = url.createObjectURL(blob)
      let a = document.createElement('a')
      a.href = downloadUrl
      a.id = "download"
      document.getElementById('downloadWrap').appendChild(a)
      a.download = '查看协议.pdf'
      a.click();
      document.getElementById('downloadWrap').removeChild(document.getElementById('download'))
    },
    // 获取月份
    getMonth (dates) {
      return String(dates).substring(4,6)
    },
    // 格式化日期 时间戳 or 20191221格式
    formatDate (dates, isStramp = false) {
      if(!dates) return ''
      if(isStramp) {
        let date = new Date(dates)
        return `${date.getFullYear()}-${this.addZero(date.getMonth() + 1)}-${this.addZero(date.getDate())}`
      }else {
        return String(dates).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
      }
    },
    // 补零
    addZero (num) {
      return num < 10 ? '0' + num : num
    },
    // 金额转换
    transYuan (num) {
      return moneyTransform(num, 'yuan', 2)
    },
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
    }
  }, 
  mounted () {
    this.queryList()
    this.addScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollFn)
  },
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.bill-wrap {
  text-align: left;
  .tab-scroll {
    // height: 123px;
    text-align: center;
    margin: 32px 0 24px;
    color: #fff;
    .box {
      // width: 1084px;
      display: flex;
      li {
        flex: 1;
        margin: 0 20px 20px 0;
        list-style: none;
        // margin-right: 24px;
        // float: left;
        font-size: 24px;
        color: #FF5000;
        background: #fff;
        text-align: center;
        border-radius: 8px;
        font-weight: bold;
        img {
          width: 70px;
          height: 75px;
          vertical-align: middle;
          margin-right: 24px;
        }
        &:last-child {
          margin-right: 0;
        }
        .bg {
          padding: 24px 0;
          background: #fff;
          border-radius: 8px;
        }
        &.active {
          background-image: linear-gradient(-180deg, rgb(255,157,32) 0%, rgb(255,80,0) 100%);
          .bg {
            padding: 22px 0;
            margin: 2PX;
            background-image: linear-gradient(-180deg, rgba(255,157,32, 0.16) 0%, rgba(255,80,0, 0.16) 100%);
          }
        }
      }
    }
  }
  .record-list {
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
            font-size: 28px;
            color: #4A4A4A;
          }
          .right {
            float: right;
            color: #000000;
            font-size: 20px;
            em {
              font-size: 28px;
            }
          }
        }
        .line-two {
          color: #9B9B9B;
          font-size: 24px;
          .right {
            float: right;
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
}
</style>
