<template>
  <div class="credit-wrap">
    <div class="top-part">
      <i-header :option="option"></i-header>
      <div class="credit-detail">
        <p class="title">当前积分</p>
        <div class="credit-tips">
          200积分将在7天后失效
        </div>
        <img class="star" />
        <p class="total-title">总积分</p>
        <em class="total-credit">30000</em>
        <div class="detail-wrap">
          <div class="detail-item">
            <img />
            <div class="detail-desc">
              <p>2000.00</p>
              <span>积分收入</span>
              <i></i>
            </div>
          </div>
          <div class="detail-item">
            <img />
            <div class="detail-desc">
              <p>2000.00</p>
              <span>积分支出</span>
              <i></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="credit-list">
      <p class="list-title">积分账单</p>
      <ul>
        <li v-for="(item, index) in creditList" :key="index">
          <img v-if="item.type == 'in'" />
          <img v-if="item.type == 'out'" />
          <div class="list-detail">
            <p>{{item.type == 'in' ? '积分收入' : '积分支出'}}</p>
            <span class="list-date">{{item.date}}</span>
          </div>
          <span class="list-amount">
            {{item.amount}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import IHeader from 'components/header/index.vue'
export default {
  name: 'Index',
  data () {
    return {
      option: {
        text: '我的积分',
        style: 'transparent',
        showBack: true
      },
      creditList: [
        {
          type: 'in',
          date: '2019-12-12',
          amount: 2000
        },
        {
          type: 'out',
          date: '2019-12-12',
          amount: -2000
        }
      ]
    }
  },
  components: {
    IHeader
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.credit-wrap {
  .top-part {
    color: #fff;
    background-image: linear-gradient(-180deg, #32A6FF 0%, #0786E7 100%);
    padding-top: 86px;
    .credit-detail {
      padding: 0 30px;
      position: relative;
      .credit-tips {
        background: rgba(255, 255, 255, 0.25);
        color: #fff;
        font-size: 20px;
        position: absolute;
        right: 30px;
        top: 0;
        padding: 4px 10px 4px 16px;
        border-radius: 60PX 30PX 30PX 10PX;
      }
      .title {
        font-size: 32px;
        font-weight: bold;
        text-align: left;
      }
      .star {
        width: 68px;
        height: 68px;
      }
      .total-title {
        font-size: 28px;
        opacity: 0.5;
        margin: 10px 0;
      }
      .total-credit {
        font-size: 64px;
        font-weight: bold;
      }
      .detail-wrap {
        display: flex;
        padding: 30px 0 20px;
        .detail-item {
          flex: 1;
          &:first-child {
            position: relative;
            &:after {
              content: '';
              position: absolute;
              right: 0;
              top: 20px;
              width: 1PX;
              height: 40px;
              display: inline-block;
              background: #D8D8D8;
            }
            i {
              background: #FFA940;
            }
          }
          .detail-desc {
            float: right;
            margin-right: 60px;
          }
          img {
            width: 54px;
            height: 54px;
            float: left;
            margin-left: 60px;
            position: relative;
            top: 8px;
          }
          p {
            font-size: 36px;
          }
          span {
            font-size: 26px;
            opacity: 0.5;
          }
          i {
            display: block;
            width: 32px;
            height: 12px;
            border-radius: 6px;
            margin: 8px auto;
            background: #FF4D4F;
          }
        }
      }
    }
  }
  .credit-list {
    text-align: left;
    .list-title {
      font-size: 30px;
      font-weight: bold;
      padding: 24px 30px;
    }
    ul {
      background: #fff;
      li {
        padding: 30px;
        border-bottom: 1PX solid #E4E7F0;
        clear: both;
        overflow: hidden;
        position: relative;
        img {
          width: 52px;
          height: 52px;
          margin-right: 26px;
          float: left;
          position: relative;
          top: 15px;
        }
        .list-detail {
          font-size: 28px;
          float: left;
          p {
            color: #222328;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .list-date {
            color: #A1A6BB;
            margin-top: 20px;
          }
        }
        .list-amount {
          color: #222328;
          font-weight: bold;
          position: absolute;
          right: 30px;
          top: 56px;
          font-size: 28px;
        }
      }
    }
  }
}
</style>
