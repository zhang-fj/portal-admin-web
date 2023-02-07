<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
    <el-form-item label="岗位编码" prop="postCode">
      <el-input v-model="formData.postCode" disabled style="width: 250px;" />
    </el-form-item>
    <el-form-item label="岗位名称" prop="postName">
      <el-input v-model="formData.postName" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="岗位描述">
      <el-input v-model="formData.postDesc" type="textarea" rows="3" style="width: 594px;" />
    </el-form-item>
  </el-form>
</template>

<script>

import { load, save } from '@/api/bm02priv/post-api' // 导入【保存】和【加载】数据服务接口
import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入

export default {
  name: 'PostForm',
  mixins: [mixinsCurdForm],
  dicts: [],
  data() {
    return {
      api: { load, save },
      defaultFormData: {},
      rules: {
        // postCode: [
        //   { required: true, message: '岗位编码不能为空', trigger: 'blur' }
        // ],
        postName: [
          { required: true, message: '岗位名称不能为空', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
