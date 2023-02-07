<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px" @submit.native.prevent>
    <el-row>
      <el-col :span="9">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input v-model="formData.title" style="width: 330px;" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述" prop="title">
              <el-input v-model="formData.desc" :rows="5" :resize="'none'" type="textarea" style="width: 330px;" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="封面" prop="title">
              <el-avatar :key="formData.mainImgId" shape="square" :size="100" :fit="'fill'" :src="mainImage" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="图片" prop="title">
              <image-upload v-if="formData.id" :key="formData.id" :src-id="formData.id" :style="{width:'330px'}" :type="mainImageCate" @handle-preview="handlePreview" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="15">
        <el-form-item prop="content">
          <tinymce-editor ref="editor" v-model="formData.content" style="width:100%" />
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>

import { load, save } from '@/api/pt01admin/topic-info-api' // 导入【保存】和【加载】数据服务接口
import { getToken } from '@/utils/auth' // 导入获取token方法
import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入
import ImageUpload from '@/components/ImageUpload'

export default {
  name: 'TopicInfoForm',
  components: { ImageUpload },
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
      mainImageCate: 'PORTAL_INFO_MAIN_IMAGE',
      show: false,
      headers: { 'Authorization': getToken() },
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
