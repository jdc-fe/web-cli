<template>
  <div class="container">
    <div class="container-inner">
      <div class="bullshit">
        <div class="bullshit__oops">消息提醒</div>
        <div class="bullshit__headline">{{ message }}</div>
        <router-link to="/home">
          <span class="bullshit__return-home">返回首页</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '您访问的页面不存在，请确认后再访问！';
    }
  }
};
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  height: 100%;
  background-color: #25252B;
}
.container-inner {
  transform: translate(-50%,-50%);
  position: absolute;
  top: 40%;
  left: 50%;
  .bullshit {
    position: relative;
    float: left;
    width: 400px;
    padding: 30px 0;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #e4dede;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
