<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
    <el-form-item label="角色编码" prop="roleCode">
      <el-input v-model="formData.roleCode" disabled style="width: 250px;" />
    </el-form-item>
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="formData.roleName" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="角色描述">
      <el-input v-model="formData.roleDesc" type="textarea" rows="3" style="width: 594px;" />
    </el-form-item>
  </el-form>
</template>

<script>

import { load, save } from '@/api/bm02priv/role-api' // 导入【保存】和【加载】数据服务接口
import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入

export default {
  name: 'RoleForm',
  mixins: [mixinsCurdForm],
  dicts: [],
  data() {
    return {
      api: { load, save },
      defaultFormData: {},
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
        // roleCode: [
        //   { required: true, message: '角色编码不能为空', trigger: 'blur' }
        // ]
      }
    }
  }
}
</script>

<style scoped>

</style>
