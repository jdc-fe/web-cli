<template>
  <div class="title">{{text}}</div>
</template>

<script>
export default {
  props: ['text']
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
  height: 24px;
  line-height: 24px;
  background-color: #F5F7FA;
  text-align: left;
  padding: 8px 16px;
}
</style>
