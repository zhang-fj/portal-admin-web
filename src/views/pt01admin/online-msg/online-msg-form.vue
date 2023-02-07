<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="formData.name" style="width: 364px;" />
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="formData.mobile" style="width: 364px;" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formData.email" style="width: 364px;" />
    </el-form-item>
    <el-form-item label="留言内容" prop="content">
      <el-input v-model="formData.content" :rows="5" type="textarea" style="width: 364px;" />
    </el-form-item>
  </el-form>
</template>

<script>

import { load, save } from '@/api/pt01admin/online-msg-api' // 导入【保存】和【加载】数据服务接口

import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入

export default {
  name: 'OnlineMsgForm',
  mixins: [mixinsCurdForm],
  data() {
    return {
      api: { load, save },
      defaultFormData: {},
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '电话不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '留言内容不能为空', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
