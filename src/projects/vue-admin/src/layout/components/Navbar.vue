<template>
  <div class="navbar">
    <div class="svg-container">
      <span class="logo">S-PARK</span> 综合管理平台
    </div>
    <div class="right-menu">
      <screenfull id="screenfull" class="right-menu-item hover-effect" />
      <el-dropdown
        class="avatar-container right-menu-item"
        placement="top"
        trigger="hover"
      >
        <div class="avatar-wrapper">
          <img :src="avatar || initAvatar" class="user-avatar">
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            {{username}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="logout" @click="logout">退出</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Screenfull from '@/components/Screenfull';
import initAvatar from '@/assets/icon_user.png';

export default {
  components: {
    Screenfull
  },
  data() {
    return {
      activeIndex: '1',
      initAvatar,
      visible: true,
      timer: 0
    };
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'username'
    ])
  },
  methods: {
    logout() {
      // await this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'variable';
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: $--color-primary;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  justify-content: space-between;
  .svg-container{
    width: 310px;
    height: 50px;
    line-height: 50px;
    color:  white;
    .logo {
      font-size: 24px;
      font-weight: 600;
      padding-right: $--main-padding;
    }
      .svg-logo{
        height: 20px;
        line-height: 20px;
      }
    // }
  }
  .naver-container{
    display: inline-block;
    &.el-menu--horizontal>.el-menu-item {
      height: 50px;
      line-height: 50px;
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: right;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    height: 100%;
    line-height: 50px;
    padding-right: 20px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0;
      height: 100%;
      font-size: 18px;
      color: #ffffff;
      vertical-align: text-bottom;
      text-align: center;

      &.hover-effect {
        cursor: pointer;
        margin-right: 16px;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      display: inline-block;
      height: 100%;
      line-height: 100%;
      font-size: 18px;

      .avatar-wrapper {
        height: 30px;
        margin-top: 10px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .message-box {
      position: fixed;
      right: 40px;
      top: 32px;
      // display: flex;
      // align-items: center;
      text-align: center;
      .message-content {
        padding: 0 24px;
        background-color: #EBEEF5;
        border-radius:10px;
        text-align: center;
        color: #3164f0;
      }
      .num {
        color: red;
      }
      .icon {
        width:0px;
        height:0px;
        border-top: 10px solid transparent;
        border-bottom: 10px solid #EBEEF5 ;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        margin-left: 24%;
      }
    }
  }
}
.user-dropdown{
  &.el-dropdown-menu {
    top: 46px;
    padding: 0;
    margin: 0;
    .el-dropdown-menu__item--divided{
      margin-top: 1px;
      &:before{
        height: 1px;
      }
    }
  }
}
.logout {
  display: inline-block;
  padding: 0 8px;
  margin-left: 16px;
  height: 100%;
  font-size: 14px;
  color: #ffffff;
  vertical-align: text-bottom;
  text-align: center;
  cursor: pointer;
}
</style>
