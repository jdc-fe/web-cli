<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    routePath() {
      return this.$route.path.split('/')[1];
    }
  },
  watch: {
    // 返回table列表时分页重置
    routePath() {
      sessionStorage.setItem('page', 1);
    }
  }
};
</script>
