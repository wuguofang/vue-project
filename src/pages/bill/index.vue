<template>
  <div class="bill-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <pannel-title text="掌柜的账簿" />
      <div class="tab-scroll">
        <scroller lock-y :scrollbar-x=false>
          <ul class="box">
            <li>
              <img src="./images/topay.png" />
              <span>未还账单</span>
            </li>
            <li>
              <img src="./images/record.png" />
              <span>还款记录</span>
            </li>
            <li>
              <img src="./images/paied.png"/>
              <span>已还账单</span>
            </li>
          </ul>
        </scroller>
      </div>
      <border-title text="还款记录" />
      <ul class="record-list">
        <li v-for="(item, index) in recordList" :key="index">
          <img v-if="item.type == 1" src="./images/man.png" />
          <img v-if="item.type == 2" src="./images/auto.png" />
          <div class="record-detail">
            <div class="line-one">
              <span class="left">
                {{item.typeText}}
              </span>
              <span class="right">
                ¥<em>{{item.amount}}</em>
              </span>
            </div>
            <div class="line-two">
              <span class="left">
                {{item.date}}
              </span>
              <span class="right">
                {{item.statusText}}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <i-tab></i-tab>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
import ITab from 'components/tab/index.vue'
import PannelTitle from 'components/pannel-title/index.vue'
import BorderTitle from 'components/border-title/index.vue'
import { Scroller } from 'vux'
export default {
  name: 'Index',
  data () {
    return {
      option: {
        text: '掌柜无忧',
        style: 'orange',
        showLogo: true
      },
      recordList: [
        {
          type: 1,
          typeText: '主动还款',
          amount: 123.4,
          status: 1,
          statusText: '已完成',
          date: '今日08 : 37'
        },
        {
          type: 2,
          typeText: '自动还款',
          amount: 123.4,
          status: 2,
          statusText: '未完成',
          date: '今日08 : 37'
        },
        {
          type: 2,
          typeText: '自动还款',
          amount: 123.4,
          status: 2,
          statusText: '未完成',
          date: '今日08 : 37'
        },
        {
          type: 2,
          typeText: '自动还款',
          amount: 123.4,
          status: 2,
          statusText: '未完成',
          date: '今日08 : 37'
        },
        {
          type: 2,
          typeText: '自动还款',
          amount: 123.4,
          status: 2,
          statusText: '未完成',
          date: '今日08 : 37'
        },
        {
          type: 2,
          typeText: '自动还款',
          amount: 123.4,
          status: 2,
          statusText: '未完成',
          date: '今日08 : 37'
        },
        {
          type: 2,
          typeText: '自动还款',
          amount: 123.4,
          status: 2,
          statusText: '未完成',
          date: '今日08 : 37'
        }
      ]
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
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.bill-wrap {
  text-align: left;
  .tab-scroll {
    height: 123px;
    margin: 32px 0 24px;
    color: #fff;
    .box {
      width: 807px;
      li {
        width: 253px;
        list-style: none;
        margin-right: 24px;
        float: left;
        font-size: 24px;
        color: #FF5000;
        background: #fff;
        text-align: center;
        padding: 24px 0;
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
      }
    }
  }
}
</style>
