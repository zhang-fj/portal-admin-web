<template>
  <div>
    <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px" @submit.native.prevent>
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" style="width: 760px;" />
      </el-form-item>
      <el-form-item label="描述" prop="title">
        <el-input v-model="formData.desc" :rows="5" :resize="'none'" type="textarea" style="width: 760px;" />
      </el-form-item>
    </el-form>
    <topic-upload-page :key="formData.id" :type="'PORTAL_ZLXZ'" :src-id="formData.id" />
  </div>

</template>

<script>

import { load, save } from '@/api/pt01admin/topic-info-api' // 导入【保存】和【加载】数据服务接口
import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入
import topicUploadPage from './topic-upload-page.vue'

export default {
  name: 'TopicZlxzInfoForm',
  components: { topicUploadPage },
  mixins: [mixinsCurdForm],
  dicts: ['T_CODE_IF'],
  data() {
    return {
      editorInit: {
        language_url: '/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/lightgray',
        height: 300
      },
      show: false,
      api: { load, save },
      defaultFormData: { status: 0 },
      rules: {
        topicId: [
          { required: true, message: '栏目ID不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    mainImage() {
      return `${this.$store.state.api.fileDownloadApi}?fileId=${this.formData.mainImgId}&isImage=true`
    }
  },
  methods: {
    handlePreview(file) {
      this.$confirm('是否将该图片设置为封面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formData.mainImgId = file.id
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }

}
</script>

<style scoped>

  .el-avatar /deep/ img{
    width: 100%;
  }

</style>
