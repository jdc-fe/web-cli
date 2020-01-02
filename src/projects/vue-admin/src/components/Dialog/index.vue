<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="options"
    :before-close="cancel"
    :close-on-click-modal="false"
    :disabled="disabled"
  >
    <slot />
    <div slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        size="small"
        @click="confirm"
        :disabled="disabled"
      >
        {{okText}}
      </el-button>
      <el-button
        v-if="!hideCancel"
        type="text"
        @click="cancel"
      >
        {{cancelText}}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    hideCancel: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
