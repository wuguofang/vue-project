<template>
  <div class="mall-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <pannel-title text="积分商城" />
      <ul class="tab-list">
        <li>
          <img src="./images/credit.png" />
          <div class="desc">
            当前积分
            <em>2400</em>
          </div>
        </li>
        <li>
          <img src="./images/record.png" />
          <div class="desc">兑换记录</div>
        </li>
      </ul>
      <div class="credit-list">
        <div class="credit-item" v-for="(item, index) in prodList" :key="index">
          <img :src="item.img" />
          <div class="prod-detail">
            <p class="prod-desc">
              {{item.desc}}
            </p>
            <span class="credit-label">
              所需积分
            </span>
            <em class="credit-mount">{{item.amount}}</em>
            <a class="exchange-btn">兑换</a>
          </div>
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
      prodList: [
        {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          desc: '【圣诞礼物】MAC/魅可尤雾弹唇膏哑光口红316/923桃新款',
          amount: 10000
        },
        {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          desc: '【圣诞礼物】MAC/魅可尤雾弹唇膏哑光口红316/923桃新款',
          amount: 10000
        },
        {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          desc: '【圣诞礼物】MAC/魅可尤雾弹唇膏哑光口红316/923桃新款',
          amount: 10000
        },
        {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          desc: '【圣诞礼物】MAC/魅可尤雾弹唇膏哑光口红316/923桃新款',
          amount: 10000
        },
        {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          desc: '【圣诞礼物】MAC/魅可尤雾弹唇膏哑光口红316/923桃新款',
          amount: 10000
        }
      ]
    }
  },
  components: {
    ITab,
    IHeader,
    PannelTitle
  },
  methods: {
  },
  mounted () {
    this.$bus.$emit('ready')
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
      img {
        width: 192px;
        height: 192px;
        float: left;
        margin-right: 32px;
      }
      .prod-detail {
        color: #4A4A4A;
        .prod-desc {
          font-size: 28px;
          font-weight: bold;
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
  }
}
</style>
