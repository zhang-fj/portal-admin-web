<template>
  <div :style="{width:'100%'}">
    <el-upload
      class="avatar-uploader"
      :multiple="true"
      :headers="headers"
      :data="data"
      accept="image/*"
      :action="$store.state.api.fileUploadApi"
      list-type="picture-card"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :on-preview="handlePreview"
      :limit="limit"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <span>
      {{ tip }}
    </span>
    <span>
      仅支持图片文件,大小不能超过{{ size }}M,还可以选择{{ limit - picNum - fileList.length }}张图片上传
    </span>
  </div>
</template>

<script>

import { getToken } from '@/utils/auth'
import { page, del } from '@/api/bm03sys/attachment-file-api' // 导入【查询】和【删除】api

export default {
  name: 'ImageUpload',
  props: {
    type: {
      type: String,
      required: true
    },
    srcId: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      default: 8
    },
    size: {
      type: Number,
      default: 2
    },
    tip: {
      type: String,
      default: '建议图片尺寸1920*1680'
    }
  },
  data() {
    return {
      loading: false,
      fileList: [],
      headers: { 'Authorization': getToken() },
      data: { srcId: this.srcId, category: this.type },
      picNum: 0
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      page({ srcId: this.srcId }).then(data => {
        this.fileList = data.data ? data.data.map((item) => { return { name: item.oriFileName, id: item.id, url: `${this.$store.state.api.fileDownloadApi}?view=1&fileId=${item.id}` } }) : []
      })
    },
    handlePreview(file) {
      this.$emit('handle-preview', file)
    },
    handleExceed() {
      this.$message({ message: `最大可上传${this.limit}张图片`, type: 'warning' })
    },
    beforeRemove(file, fileList) {
      this.$confirm('是否删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del([file.id]).then(data => {
          this.picNum--
          fileList.splice(fileList.indexOf(file), 1)
          this.$emit('remove-success', this.fileList)
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
      return false
    },
    handleProgress() {
    },
    handleError(res, file, fileList) {
      this.picNum--
      this.$message({ showClose: true, message: JSON.parse(res.message).message, type: 'warning' })
    },
    handleSuccess(res, file) {
      file.id = res.fileId
      this.$emit('upload-success', file)
    },
    beforeUpload(file) {
      this.picNum++
      const typeArray = file.type.split('/')
      if (typeArray[0] !== 'image') {
        this.$message({ showClose: true, message: '请选择图片文件!', type: 'warning' })
        return false
      }
      if (file.size / (1024 * 1024) > this.size) {
        this.$message({ showClose: true, message: `请选择小于${this.size}M的图片文件!`, type: 'warning' })
        return false
      }
      if (this.picNum + this.fileList.length > this.limit) {
        this.$message({ showClose: true, message: `图片数据已超出${this.limit}张!`, type: 'warning' })
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>

  .avatar-uploader /deep/ .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }

  .avatar-uploader /deep/ .el-upload-list .el-upload-list__item{
    width: 100px;
    height: 100px;
  }

  .avatar-uploader /deep/ .el-upload-list .el-upload-list__item .el-progress{
    width: 88px;
    height: 88px;
  }

  .avatar-uploader /deep/ .el-upload-list .el-upload-list__item .el-progress-circle{
    width: 88px !important;
    height: 88px !important;
  }
</style>
