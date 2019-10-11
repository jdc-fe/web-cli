<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p class="tips mb-content">
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>

      <el-switch
        active-text="按月付费"
        inactive-text="按年付费">
      </el-switch>
      <el-button type="primary" round>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'app',
  components: {
    HelloWorld
  }
};
</script>


<style lang="scss" scoped>
@import 'variable';
.tips {
  // font-size: $--font-size-base;
  color: $--color-primary-light-1;
}
</style>
