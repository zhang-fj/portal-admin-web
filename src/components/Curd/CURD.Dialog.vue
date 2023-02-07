<!--分页-->
<template>
  <el-dialog :modal="modal" :close-on-click-modal="false" :before-close="toCancelCU" :visible="visible" :width="width" :title="title">
    <slot />
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="toCancelCU">取消</el-button>
      <el-button type="primary" :loading="loading" @click="toSubmitCU">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    modal: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '800px'
    },
    width: {
      type: String,
      default: '800px'
    }
  },
  methods: {
    toCancelCU() {
      this.$emit('cancel-cu-handler')
    },
    toSubmitCU() {
      this.$emit('submit-cu-handler')
    }
  }
}
</script>
