<template>
  <div>
    <svg-icon icon-class="fullscreen" @click="click" />
  </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
  methods: {
    // eslint-disable-next-line consistent-return
    click() {
      if (!screenfull.enabled) {
        this.$notify({
          title: '警告',
          message: 'you browser can not work',
          type: 'warning'
        });
        return false;
      }
      screenfull.toggle();
    }
  }
};
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 24px;
  height: 24px;
  vertical-align: 10px;
}
</style>
