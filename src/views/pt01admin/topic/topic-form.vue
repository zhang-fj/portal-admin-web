<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="100px">
    <el-form-item label="栏目名称" prop="topicName">
      <el-input v-model="formData.topicName" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="栏目描述" prop="topicDesc">
      <el-input v-model="formData.topicDesc" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="栏目路径">
      <el-input v-model="formData.topicPath" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="导航菜单" prop="navigateMenu">
      <div style="width: 250px;">
        <el-radio v-for="item in dict.T_CODE_IF" :key="item.value" v-model="formData.navigateMenu" :label="item.value">
          {{ item.label }}
        </el-radio>
      </div>
    </el-form-item>
    <el-form-item label="首页展示" prop="homeDisplay">
      <div style="width: 250px;">
        <el-radio v-for="item in dict.T_CODE_IF" :key="item.value" v-model="formData.homeDisplay" :label="item.value">
          {{ item.label }}
        </el-radio>
      </div>
    </el-form-item>
    <el-form-item label="首页条数">
      <el-input-number v-model="formData.homeInfoSize" :min="1" :max="10" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="展示位置">
      <el-input-number v-model="formData.homeIndex" :min="1" :max="10" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="展示模板">
      <!-- <el-input v-model="formData.homeTemp" style="width: 250px;" /> -->
      <el-select v-model="formData.homeTemp" filterable clearable placeholder="请选择" style="width: 250px;">
        <el-option
          v-for="item in dict.T_CODE_HOME_TEMP"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="二级页模板">
      <!-- <el-input v-model="formData.secondaryTemp" style="width: 250px;" /> -->
      <el-select v-model="formData.secondaryTemp" filterable clearable placeholder="请选择" style="width: 250px;">
        <el-option
          v-for="item in dict.T_CODE_SECONDARY_TEMP"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="信息页模板">
      <!-- <el-input v-model="formData.infoTemp" :rows="3" style="width: 250px;" /> -->
      <el-select v-model="formData.infoTemp" filterable clearable placeholder="请选择" style="width: 250px;">
        <el-option
          v-for="item in dict.T_CODE_INFO_TEMP"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="信息类型">
      <!-- <el-input v-model="formData.infoTemp" :rows="3" style="width: 250px;" /> -->
      <el-select v-model="formData.infoType" filterable clearable placeholder="请选择" style="width: 250px;">
        <el-option
          v-for="item in dict.T_CODE_INFO_TYPE"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="排序">
      <el-input-number v-model="formData.sort" :min="0" style="width: 250px;" />
    </el-form-item>
  </el-form>
</template>

<script>

import { load, save } from '@/api/pt01admin/topic-api' // 导入【保存】和【加载】数据服务接口
import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入

export default {
  name: 'TopicForm',
  mixins: [mixinsCurdForm],
  dicts: ['T_CODE_IF', 'T_CODE_HOME_TEMP', 'T_CODE_SECONDARY_TEMP', 'T_CODE_INFO_TEMP', 'T_CODE_INFO_TYPE'],
  data() {
    return {
      api: { load, save },
      defaultFormData: { navigateMenu: '1', homeDisplay: '1', homeInfoSize: 1, homeIndex: 1, sort: 0 },
      rules: {
        topicName: [
          { required: true, message: '栏目名称不能为空', trigger: 'blur' }
        ],
        homeDisplay: [
          { required: true, message: '首页展示不能为空', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
