<template>
  <div>
    <span class="titleText">标题:&nbsp;</span>
    <el-input
      v-model="titleVal"
      class="titleInput"
      placeholder="请输入标题"
      type="text"
      :maxlength="48"
      show-word-limit
    />
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    title: String,
    secIdx: { // 版块序号
      type: Number,
      default: 0
    },
    curIdx: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      titleVal: this.title
    };
  },
  watch: {
    titleVal(val) {
      this.titleVal = val;
      this.$emit('setTitle', this.titleVal, this.secIdx, this.curIdx);
    },
    title() {
      this.titleVal = this.title;
    }
  }
};
</script>
