<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
    <el-form-item label="参数值" prop="paramValue">
      <el-input v-model="formData.paramValue" style="width: 364px;" />
    </el-form-item>
    <el-form-item label="参数描述" prop="paramDesc">
      <el-input v-model="formData.paramDesc" :rows="3" type="textarea" style="width: 364px;" />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="formData.remark" :rows="3" type="textarea" style="width: 364px;" />
    </el-form-item>
  </el-form>
</template>

<script>

import { load, save } from '@/api/bm03sys/sys-param-api' // 导入【保存】和【加载】数据服务接口
import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入

export default {
  name: 'SysParamForm',
  mixins: [mixinsCurdForm],
  dicts: [],
  data() {
    return {
      api: { load, save },
      defaultFormData: {},
      rules: {
        paramValue: [
          { required: true, message: '参数值不能为空', trigger: 'blur' },
          { type: 'string', max: 1000, message: '参数值不能超过1000字', trigger: 'blur' }
        ],
        paramDesc: [
          { required: true, message: '参数描述不能为空', trigger: 'blur' },
          { type: 'string', max: 80, message: '参数描述不能超过500字', trigger: 'blur' }
        ],
        remark: [
          { type: 'string', max: 500, message: '备注不能超过500字', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
