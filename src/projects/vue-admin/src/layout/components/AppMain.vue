<template>
  <section class="app-main">
    <tags-view />
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import TagsView from './TagsView';

export default {
  name: 'AppMain',
  components: {
    TagsView
  },
  computed: {
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  box-sizing: border-box;
  top: 50px;
  min-height: calc(100vh - 150px);
  width: 100%;
  position: relative;
  overflow: hidden; /*解决mac台式机出现的问题  */
  padding-left: 56px;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>
