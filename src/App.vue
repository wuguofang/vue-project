<template>
  <div id="app" :class="'page-' + current">
    <div class="slider-bg"></div>
    <router-view class="common-wrap" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      current: ''
    }
  },
  mounted () {
    this.updateClass();
    document.addEventListener('gesturestart', (event) => {
      event.preventDefault();
    });
  },
  updated () {
    this.updateClass();
  },
  methods: {
    updateClass() {
      let current = this.$router.history.current.name
      this.current = String(current).toLowerCase()
    }
  },
}
</script>

<style rel="stylesheet/less" lang="less">
#app {
  font-family: Helvetica Neue,Helvetica,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  position: relative;
  .slider-bg {
    background: #FF5000;
    position: absolute;
    top: 100px;
    height: 200px;
    width: 100%;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    z-index: 1;
  }
  .common-wrap {
    position: relative;
    z-index: 11;
  }
  .content-wrap {
    margin: 0 30px;
    padding: 120px 0 130px;
  }
  .no-data {
    padding: 24px;
    text-align: center;
    color: #999;
  }
}
</style>
