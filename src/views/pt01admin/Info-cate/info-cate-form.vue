<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
    <el-form-item label="栏目编码" prop="topicId">
      <el-select v-model="formData.topicId" filterable placeholder="请选择" style="width: 250px;">
        <el-option
          v-for="item in datamap['topics']"
          :key="item.topicId"
          :label="item.topicName"
          :value="item.topicId"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="分类名称" prop="cateName">
      <el-input v-model="formData.cateName" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="分类编码" prop="cateCode">
      <el-input v-model="formData.cateCode" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="排序">
      <el-input-number v-model="formData.sort" :min="0" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="分类状态">
      <el-select v-model="formData.status" filterable placeholder="请选择" style="width: 250px;">
        <el-option
          v-for="item in status"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>

import { load, save } from '@/api/pt01admin/info-cate-api' // 导入【保存】和【加载】数据服务接口
import { page as topics } from '@/api/pt01admin/topic-api' // 导入【查询】api

import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入
import mixinsDatas from '@/mixins/curd/mixins-select-data' // 导入【获取数据接口】混入

export default {
  name: 'InfoCateForm',
  mixins: [mixinsCurdForm, mixinsDatas],
  dicts: ['T_CODE_IF'],
  data() {
    return {
      api: { load, save },
      status: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }],
      defaultFormData: { sort: 0, status: 0 },
      apimap: { topics: topics },
      rules: {
        cateId: [
          { required: true, message: '本系统中的用户ID，格式：UUID不能为空', trigger: 'blur' }
        ],
        topicId: [
          { required: true, message: '栏目ID不能为空', trigger: 'blur' }
        ],
        topicCode: [
          { required: true, message: '栏目编码不能为空', trigger: 'blur' }
        ],
        cateName: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        cateCode: [
          { required: true, message: '分类编码不能为空', trigger: 'blur' }
        ],
        inputTime: [
          { required: true, message: '录入时间不能为空', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
