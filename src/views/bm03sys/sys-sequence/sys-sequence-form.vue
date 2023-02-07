<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="160px">
    <el-form-item label="业务前缀字母" prop="bizPrefix">
      <el-input v-model="formData.bizPrefix" style="width: 364px;" />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="formData.remark" :rows="3" type="textarea" style="width: 364px;" />
    </el-form-item>
  </el-form>
</template>

<script>

import { load, save } from '@/api/bm03sys/sys-sequence-api' // 导入【保存】和【加载】数据服务接口
import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入

export default {
  name: 'SysSequenceForm',
  mixins: [mixinsCurdForm],
  dicts: [],
  data() {
    return {
      api: { load, save },
      defaultFormData: {},
      rules: {
        // bizPrefix: [
        //   { required: true, message: '业务前缀字母不能为空', trigger: 'blur' }
        // ],
        seqval: [
          { required: true, message: '当前值不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '当前值不能为空', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
