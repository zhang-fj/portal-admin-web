<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
    <el-form-item label="代码表名" prop="codeId">
      <el-input v-model="formData.codeId" style="width: 450px;" />
    </el-form-item>
    <el-form-item label="描述" prop="codeDesc">
      <el-input v-model="formData.codeDesc" style="width: 450px;" />
    </el-form-item>
    <el-form-item label="排序" prop="orderCol">
      <el-input v-model="formData.orderCol" style="width: 450px;" />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="formData.remark" type="textarea" rows="3" style="width: 450px;" />
    </el-form-item>
  </el-form>
</template>

<script>

import { load, save } from '@/api/bm03sys/sys-code-api' // 导入【保存】和【加载】数据服务接口
import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入

export default {
  name: 'SysCodeForm',
  mixins: [mixinsCurdForm],
  dicts: [],
  data() {
    return {
      api: { load, save },
      defaultFormData: {},
      rules: {
        codeId: [
          { required: true, message: '代码表名不能为空', trigger: 'blur' }
        ],
        codeDesc: [
          { required: true, message: '代码表描述不能为空', trigger: 'blur' }
        ],
        orderCol: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
