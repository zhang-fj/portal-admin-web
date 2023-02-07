<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
    <el-form-item label="分类编码" prop="cateCode">
      <el-input v-model="formData.cateCode" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="分类名称" prop="cateName">
      <el-input v-model="formData.cateName" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="分类路径" prop="catePath">
      <el-input v-model="formData.catePath" style="width: 594px;" />
    </el-form-item>
    <el-form-item>
      路径为空时，文件保存在根目录。填写示例:\XXFL_PATH\。
    </el-form-item>
  </el-form>
</template>

<script>

import { load, save } from '@/api/bm03sys/attachment-cate-api' // 导入【保存】和【加载】数据服务接口
import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入

export default {
  name: 'AttachmentCateForm',
  mixins: [mixinsCurdForm],
  dicts: [],
  data() {
    return {
      api: { load, save },
      defaultFormData: {},
      rules: {
        cateCode: [
          { required: true, message: '分类编码不能为空', trigger: 'blur' }
        ],
        cateName: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
