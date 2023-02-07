<template>
  <span>
    <el-upload
      class="file-uploader"
      :multiple="true"
      :headers="headers"
      :data="data"
      :action="$store.state.api.fileUploadApi"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :before-upload="beforeUpload"
    >
      <slot />
    </el-upload>
  </span>
</template>

<script>

import { getToken } from '@/utils/auth'

export default {
  name: 'FileUpload',
  props: {
    type: {
      type: String,
      required: true
    },
    srcId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      headers: { 'Authorization': getToken() },
      data: { srcId: this.srcId, category: this.type }
    }
  },
  methods: {
    handleError(res, file, fileList) {
      console.info(res)
    },
    handleProgress(event, file, fileList) {
      console.info('handleProgress')
    },
    handleSuccess(res, file) {
      this.$emit('upload-success')
    },
    beforeUpload(file) {
      return true
    }
  }
}
</script>

<style scoped>
  .file-uploader{
    display:inline;
  }
</style>
