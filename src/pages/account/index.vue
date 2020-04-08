<template>
  <div class="account-wrap">
    <i-header :option="option"></i-header>
    <div class="content-wrap">
      <pannel-title text="账户信息">
        <a v-if="showLogin" class="login-btn" @click="goLogin">登录／注册</a>
        <a v-if="!showLogin" class="login-btn" @click="confirmLogout">退出／注销</a>
      </pannel-title>
      <div class="account-detail" v-if="userInfo">
        <ul>
          <li>
            <span class="detail-label">姓名</span>
            <div class="right-part">
              <span class="detail-content">
                <span>{{userInfo.certName ? desensitization(userInfo.certName, 1, 0) : '暂无'}}</span>
              </span>
              <a class="go-arrow gray"></a>
            </div>
          </li>
          <li>
            <span class="detail-label">手机号码</span>
            <div class="right-part">
              <span class="detail-content">
                <span>{{userInfo.mobile || '暂无'}}</span>
              </span>
              <!-- <a class="go-arrow" @click="modifyMobile()">修改</a> -->
              <a class="go-arrow gray"></a>
            </div>
          </li>
          <li>
            <span class="detail-label">邮箱绑定</span>
            <div class="right-part">
              <span class="detail-content">
                <span>{{userInfo.email || '暂无'}}</span>
              </span>
              <a class="go-arrow gray"></a>
            </div>
          </li>
          <li>
            <span class="detail-label">银行卡</span>
            <div class="right-part">
              <span class="detail-content">
                <span>{{bankInfo && bankInfo.bankCardNumber ? desensitization(bankInfo.bankCardNumber, 4, 4) : '暂无'}}</span>
              </span>
              <a class="go-arrow" @click="modifyBank()">修改</a>
            </div>
          </li>
          <li>
            <span class="detail-label">身份证号</span>
            <div class="right-part">
              <span class="detail-content">
                <span>{{userInfo.certNumber ? desensitization(userInfo.certNumber, 1, 1) : '暂无'}}</span>
              </span>
              <a class="go-arrow gray"></a>
            </div>
          </li>
          <li>
            <span class="detail-label">通信地址</span>
            <div class="right-part">
              <span class="detail-content">
                <span>
                  {{userInfo.address || '暂无'}}
                </span>
              </span>
              <!-- <a class="go-arrow" @click="modify({label: '收货地址', name: 'address'})">修改</a> -->
              <a class="go-arrow gray"></a>
            </div>
          </li>
          <li>
            <span class="detail-label">实名信息</span>
            <div class="right-part">
              <span class="detail-content">
                <span>
                  <img v-if="userInfo.checkState == 'CHECKED'" class="identidied" src="./images/identified.png" />
                  <img v-else class="identidied" src="./images/unidentified.jpeg" />
                </span>
              </span>
              <a class="go-arrow" @click="goCert">修改</a>
            </div>
          </li>
          <li>
            <span class="detail-label">修改密码</span>
            <div class="right-part">
              <span class="detail-content">
                <span>&nbsp;</span>
              </span>
              <a class="go-arrow" @click="modifyPass">修改</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <i-tab></i-tab>
    <div class="confirm-logout-wrap">
      <confirm v-model="showConfirm"
      title=""
      @on-cancel="cancelLogout"
      @on-confirm="logout">
        <p class="confirm-text">
          确认退出？
        </p>
      </confirm>
    </div>
  </div>
</template>

<script>
import PannelTitle from 'components/pannel-title/index.vue'
import IHeader from 'components/header/index.vue'
import ITab from 'components/tab/index.vue'
import desensitization from 'util/desensitization'
import Cookies from 'js-cookie'
import { Confirm } from 'vux'
export default {
  name: 'Account',
  data () {
    return {
      userInfo: null,
      bankInfo: null,
      showConfirm: false,
      showLogin: false,
      option: {
        text: '掌柜无忧',
        style: 'orange',
        showBack: true
      },
      desensitization: desensitization,
    }
  },
  components: {
    IHeader,
    ITab,
    PannelTitle,
    Confirm
  },
  mounted() {
    this.getInfo()
    this.getBank()
  },
  methods: {
    // 跳转登录
    goLogin () {
      this.$router.push({path: '/login'})
    },
    // 修改密码
    modifyPass () {
      this.$router.push({
        path: '/modify-password',
        query: {
          type: 'modify'
        }
      })
    },
    // 修改手机号
    modifyMobile () {
      this.$router.push({
        path: '/validate-mobile',
        query: {
          opType: 'NMODIFYMOBILE',
          mobileLabel: '新手机号',
          mobilePlaceholder: '请输入新手机号',
          nextPage: '/modify-mobile'
        }
      })
    },
    // 修改银行卡
    modifyBank () {
      this.$router.push({
        path: '/modify-bank'
      })
    },
    // 确认是否退出登录
    confirmLogout () {
      this.showConfirm = true
    },
    // 取消退出登录
    cancelLogout () {
      this.showConfirm = false
    },
    // 确定退出登录
    logout () {
      Cookies.set('token', '')
      localStorage.clear()
      this.showConfirm = false
      this.showLogin = true
      this.userInfo = null
      this.$router.push({path: '/login'})
    },
    // 跳转修改页面
    modify (params) {
      let { name } = params
      this.$router.push({path: '/modify', query: {
        name
      }})
    },
    // 跳转实名认证
    goCert () {
      this.$router.push({path: '/identify'})
    },
    // 获取用户信息
    getInfo () {
      this.$ajax({
        url : '/person/detail',
        method: 'get',
        directAjax: true
      }).then(res => {
        this.$judgeLogin(res)
        if(res.success) {
          this.userInfo = res.data.target
        }
        this.showLogin = res.needLogin
      })
    },
    // 获取银行卡信息
    getBank () {
      this.$ajax({
        url : '/bankcard/getByCustomerId',
        method: 'post',
        directAjax: true
      }).then(res => {
        this.$judgeLogin(res)
        if(res.success) {
          this.bankInfo = res.data.target[0]
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.account-wrap {
  text-align: left;
  .login-btn {
    font-size: 32px;
    color: #fff;
    float: right;
    margin-top: 10px;
  }
  .account-detail {
    margin-top: 30px;
    background: #FFFFFF;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.16);
    border-radius: 8px;
    ul {
      li {
        overflow: hidden;
        list-style: none;
        display: flex;
        .detail-label {
          font-size: 28px;
          color: #FF5000;
          float: left;
          width: 120px;
          margin: 20px 24px 0 0;
          padding-left: 24px;
          text-align: justify;
          text-align-last: justify;
        }
        .right-part {
          float: left;
          border-bottom: 1PX solid #D8D8D8;
          padding: 24px 0;
          position: relative;
          flex: 1;
          display: flex;
        }
        .detail-content {
          font-size: 28px;
          color: #9B9B9B;
          text-align: right;
          vertical-align: middle;
          flex: 1;
          span {
            width: 350px;
            display: inline-block;
            padding-right: 36px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .identidied {
            width: 125px;
            height: 38px;
          }
        }
        .go-arrow {
          display: inline-block;
          position: relative;
          // width: 32px;
          width: 62px;
          height: 34px;
          line-height: 34px;
          color: #FF9D20;
          margin-right: 32px;
          border: 1PX solid #FF9D20;
          font-size: 16px;
          text-align: center;
          &.gray {
            border: none;
            // border: 1PX solid #999;
            // &::after {
            //   border-right: 2PX solid #999;
            //   border-top: 2PX solid #999;
            // }
          }
          // &::after {
          //   content: '';
          //   display: inline-block;
          //   width: 12px;
          //   height: 12px;
          //   border-right: 2PX solid #FF9D20;
          //   border-top: 2PX solid #FF9D20;
          //   position: absolute;
          //   left: 5px;
          //   top: 8px;
          //   transform: rotate(45deg);
          // }
        }
      }
    }
  }
}
.confirm-logout-wrap {
  .confirm-text {
    font-size: 32px;
  }
}
</style>
