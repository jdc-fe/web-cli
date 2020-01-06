<template>
  <div class="time-button">
    <el-button
      type="text"
    :disabled="disabled || time > 0"
      @click="run"
    >
      {{ text }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'TimeButton',
  props: {
    second: {
      type: Number,
      default: 60
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validate: {
      type: Function,
      default: () => true
    }
  },
  data() {
    return {
      time: 0
    };
  },
  computed: {
    text() {
      return this.time > 0 ? `${this.time}s后重新发送` : '发送邮箱验证码';
    }
  },
  methods: {
    run() {
      if (this.validate()) {
        this.start();
        this.$emit('run');
      }
    },
    start() {
      this.time = this.second;
      this.timer();
    },
    stop() {
      this.time = 0;
      this.disabled = false;
    },
    setDisabled(val) {
      this.disabled = val;
    },
    timer() {
      const { time } = this;
      if (time > 0) {
        this.time = time - 1;
        setTimeout(this.timer, 1000);
      } else {
        this.disabled = false;
      }
    }

  }
};
</script>

<style scoped>
.time-button {
  display: inline-block;
  cursor: default;
}
</style>
