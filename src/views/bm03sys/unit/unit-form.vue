<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
    <el-form-item label="机构代码">
      <el-input v-model="formData.code" disabled style="width: 250px;" />
    </el-form-item>
    <el-form-item label="日常名称" prop="name">
      <el-input v-model="formData.name" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="拼音缩写" prop="spell">
      <el-input v-model="formData.spell" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="机构全称" prop="fullName">
      <el-input v-model="formData.fullName" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="机构简称" prop="shortName">
      <el-input v-model="formData.shortName" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="邮政编码" prop="postCode">
      <el-input v-model="formData.postCode" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="formData.address" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="联系电话" prop="telphone">
      <el-input v-model="formData.telphone" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="电子邮箱" prop="email">
      <el-input v-model="formData.email" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="排序编号" prop="unitOrder">
      <el-input v-model="formData.unitOrder" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="机构描述" prop="descs">
      <el-input v-model="formData.descs" type="textarea" rows="3" style="width: 593px;" />
    </el-form-item>
  </el-form>
</template>

<script>

import { load, save } from '@/api/bm03sys/unit-api' // 导入【保存】和【加载】数据服务接口
import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入

export default {
  name: 'UnitForm',
  mixins: [mixinsCurdForm],
  dicts: [],
  data() {
    return {
      api: { load, save },
      defaultFormData: {},
      rules: {
        name: [
          { required: true, message: '日常名称不能为空', trigger: 'blur' }
        ],
        // spell: [
        //   { required: true, message: '拼音缩写不能为空', trigger: 'blur' }
        // ],
        fullName: [
          { required: true, message: '机构全称不能为空', trigger: 'blur' }
        ]
        // shortName: [
        //   { required: true, message: '机构简称不能为空', trigger: 'blur' }
        // ]
        // postCode: [
        //   { required: true, message: '邮政编码不能为空', trigger: 'blur' }
        // ],
        // address: [
        //   { required: true, message: '地址不能为空', trigger: 'blur' }
        // ],
        // telphone: [
        //   { required: true, message: '联系电话不能为空', trigger: 'blur' }
        // ],
        // email: [
        //   { required: true, message: '电子邮箱不能为空', trigger: 'blur' }
        // ],
        // pcode: [
        //   { required: true, message: '上级机构代码不能为空', trigger: 'blur' }
        // ],
        // descs: [
        //   { required: true, message: '机构描述不能为空', trigger: 'blur' }
        // ],
        // unitOrder: [
        //   { required: true, message: '排序编号不能为空', trigger: 'blur' }
        // ]
      }
    }
  }
}
</script>

<style scoped>

</style>
