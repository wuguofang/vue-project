<template>
  <div class="tab-wrap">
    <tab :line-width="0">
      <tab-item v-for="(tab, index) in tabs" :key="index" :selected="tab.selected" @on-item-click="click">
        <img :src="tab.iconActive" v-if="tab.selected" />
        <img :src="tab.icon" v-if="!tab.selected" />
        <span class="tab-item">{{tab.name}}</span>
      </tab-item>
    </tab>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
export default {
  name: 'itab',
  props: {
    option: {
      default: function () {
        return {
        }
      }
    }
  },
  data () {
    return {
      tabs: [
        {
          name: '首页',
          icon: require('./images/index.png'),
          iconActive: require('./images/index-active.png'),
          url: '/index'
        },
        {
          name: '掌柜账簿',
          icon: require('./images/bill.png'),
          iconActive: require('./images/bill-active.png'),
          url: '/bill'
        },
        {
          name: '积分商城',
          icon: require('./images/mall.png'),
          iconActive: require('./images/mall-active.png'),
          url: '/mall'
        },
        {
          name: '掌柜账户',
          icon: require('./images/me.png'),
          iconActive: require('./images/me-active.png'),
          url: '/account',
          selected: true
        }
      ]
    }
  },
  components: {
    Tab,
    TabItem
  },
  methods: {
    click (e) {
      console.log('-----', e)
      this.$router.push({path: this.tabs[e].url})
    }
  },
  mounted () {
    let activePath = this.$route.path
    let tabs = this.tabs
    tabs.map((item) => {
      item.selected = false
      if (item.url === activePath) {
        item.selected = true
      }
      return item
    })
    this.tabs = tabs
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.tab-wrap {
  position: fixed;
  bottom: 0;
  width: 100%;
  .vux-tab-warp {
    height: 120px;
    padding-top: 0;
  }
  .vux-tab-container {
    height: 120px;
  }
  .vux-tab {
    height: 120px;
    .vux-tab-item {
      line-height: inherit;
      font-size: 24px;
      padding: 16px 0 16px;
      color: #FF9D20;
      &.vux-tab-selected {
        color: #FF5000;
        font-weight: bold;
      }
    }
  }
  img {
    width: 56px;
    height: 56px;
    vertical-align: top;
  }
  .tab-item {
    display: block;
  }
}
</style>
