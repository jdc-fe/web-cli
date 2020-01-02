<template>
  <el-select
    v-model="value"
    :placeholder="placeholder"
    @change="change"
  >
    <el-option
      v-for="(i, idx) in options"
      :key="idx"
      :label="i.label"
      :value="i.value"
    />
  </el-select>
</template>

<script>
export default {
  props: ['defaultVal', 'placeholder', 'options'],
  data() {
    return {
      value: this.defaultVal
    };
  },
  methods: {
    change() {
      this.$emit('update', this.value);
    }
  }
};
</script>
