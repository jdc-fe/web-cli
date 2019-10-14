<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p class="tips mb-content">
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss" scoped>
@import 'variable';
.tips {
  // font-size: $--font-size-base;
  color: $--color-primary-light-1;
}
</style>
