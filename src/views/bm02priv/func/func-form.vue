<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
    <el-form-item label="功能类型" prop="isLeaf">
      <el-radio-group v-model="formData.isLeaf" size="mini" style="width: 250px">
        <el-radio-button label="0">目录</el-radio-button>
        <el-radio-button label="1">菜单</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="功能名称" prop="funcName">
      <el-input v-model="formData.funcName" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="功能简称" prop="funcShortName">
      <el-input v-model="formData.funcShortName" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="功能地址" prop="funcAddr">
      <el-input v-model="formData.funcAddr" style="width: 250px;" />
    </el-form-item>
    <el-form-item label="功能图标" prop="icon">
      <el-popover
        placement="bottom-start"
        width="450"
        trigger="click"
        @show="$refs['iconSelect'].reset()"
      >
        <IconSelect ref="iconSelect" @selected="selected" />
        <el-input slot="reference" v-model="formData.icon" style="width: 250px;" placeholder="点击选择图标" readonly>
          <svg-icon v-if="formData.icon" slot="prefix" :icon-class="formData.icon" class="el-input__icon" style="height: 32px;width: 16px;" />
          <i v-else slot="prefix" class="el-icon-search el-input__icon" />
        </el-input>
      </el-popover>
    </el-form-item>
    <el-form-item label="菜单序号" prop="orderNum">
      <el-input v-model="formData.orderNum" style="width: 250px;" />
    </el-form-item>
    <template v-if="formData.isLeaf === '1'">
      <el-form-item label="打开方式" prop="openType">
        <el-radio-group v-model="formData.openType" style="width: 250px;">
          <el-radio :label="0">tab页签</el-radio>
          <el-radio :label="1">浏览器窗口</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="功能组件">
        <el-input v-model="formData.component" style="width: 250px;" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script>

import { load, save } from '@/api/bm02priv/func-api' // 导入【保存】和【加载】数据服务接口

import IconSelect from '@/components/IconSelect'

import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入

export default {
  name: 'FuncForm',
  components: { IconSelect },
  mixins: [mixinsCurdForm],
  dicts: [],
  data() {
    return {
      api: { load, save },
      defaultFormData: { icon: '', openType: 0, orderNum: 0 },
      rules: {
        funcName: [
          { required: true, message: '功能名称不能为空', trigger: 'blur' }
        ],
        funcShortName: [
          { required: true, message: '功能简称不能为空', trigger: 'blur' }
        ],
        funcAddr: [
          { required: true, message: '功能地址不能为空', trigger: 'blur' }
        ],
        isLeaf: [
          { required: true, message: '功能类型V', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '功能序号不能为空', trigger: 'blur' }
        ],
        openType: [
          { required: true, message: '打开方式不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 选中图标
    selected(name) {
      this.formData.icon = name
    }
  }
}
</script>

<style scoped>

</style>
