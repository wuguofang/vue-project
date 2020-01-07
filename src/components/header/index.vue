<template>
  <div :class="'header-wrap header-' + option.style">
    <x-header :left-options="leftOptions">
      <img class="logo" slot="left" v-if="option.showLogo" src="./images/logo.png" />
      {{option.text}}
    </x-header>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  name: 'iheader',
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
      leftOptions: {
        backText: '',
        showBack: this.option.showBack
      }
    }
  },
  components: {
    XHeader
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.$bus.$emit('ready')
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.header-wrap {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 111;
  .logo {
    width: 80px;
    height: 80px;
    position: relative;
    bottom: 16px;
  }
  .vux-header {
    height: 102px;
    background-color: transparent;
    font-size: 36px;
    .vux-header-left .left-arrow:before {
      border-color: #fff;
      border-width: 2PX 0 0 2PX;
    }
  }
  &.header-orange {
    .vux-header {
      background-image: linear-gradient(-180deg, #FF9D20 0%, #FF5000 100%); 
    }
  }
}
</style>
