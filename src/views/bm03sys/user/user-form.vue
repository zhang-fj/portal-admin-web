<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
    <el-row>
      <el-col :span="20">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="formData.userName" style="width: 220px;" />
        </el-form-item>
        <el-form-item label="员工编号" prop="empCode">
          <el-input v-model="formData.empCode" style="width: 220px;" />
        </el-form-item>
        <el-form-item label="姓名" prop="empName">
          <el-input v-model="formData.empName" style="width: 220px;" />
        </el-form-item>
        <el-form-item label="所属单位" prop="empUnitcode">
          <el-select v-model="formData.empUnitcode" filterable placeholder="请选择" class="column-input" style="width: 220px;">
            <el-option
              v-for="item in dict.T_DICT_UNIT"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="员工职务" prop="empBusiness">
          <el-input v-model="formData.empBusiness" style="width: 220px;" />
        </el-form-item>
        <el-form-item label="是否锁定" prop="isLock">
          <el-radio-group v-model="formData.isLock">
            <el-radio v-for="item in dict.T_CODE_IF" :key="item.id" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <div class="head_box">
          <img ref="headImage" class="head_image" :src="getPhotoImagePath()" @click="show = true && formData.id !=null && formData.id !=''">
          <image-crop-upload
            v-model="show"
            field="file"
            :headers="headers"
            :params="{ srcId: formData.id, category:'USER_HEAD_IMG' }"
            :url="$store.state.api.fileUploadApi"
            @crop-upload-success="cropUploadSuccess"
          />
        </div>
        <el-col /></el-col></el-row>
    <el-form-item label="员工类型" prop="empType">
      <el-input v-model="formData.empType" style="width: 220px;" />
    </el-form-item>
    <el-form-item label="手机号码" prop="empPhone">
      <el-input v-model="formData.empPhone" style="width: 356px;" />
    </el-form-item>
    <el-form-item label="邮件地址" prop="empEmail">
      <el-input v-model="formData.empEmail" style="width: 220px;" />
    </el-form-item>
    <el-form-item label="排序编号" prop="empOrder">
      <el-input v-model="formData.empOrder" style="width: 356px;" />
    </el-form-item>
  </el-form>
</template>

<script>

import { load, save } from '@/api/bm03sys/user-api' // 导入【保存】和【加载】数据服务接口
import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入

import { getToken } from '@/utils/auth'
import ImageCropUpload from 'vue-image-crop-upload'

export default {
  name: 'UserForm',
  components: { ImageCropUpload },
  mixins: [mixinsCurdForm],
  dicts: ['T_CODE_IF', 'T_DICT_UNIT'],
  data() {
    return {
      show: false,
      api: { load, save },
      defaultFormData: {},
      headers: { 'Authorization': getToken() },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 上传成功回调
    cropUploadSuccess(jsonData, field) {
      this.$refs.headImage = this.getPhotoImagePath()
    },
    getPhotoImagePath() {
      return this.$store.state.api.fileDownloadApi + '?srcId=' + this.formData.id + '&type=USER_HEAD_IMG&isImage=true&dt=' + new Date().getTime()
    }
  }
}
</script>

<style scoped>

 .head_box{
    width: 120px;
    height: 135px;
    padding: 5px;
    border: 2px #46a6ff dashed;
  }
  .head_image{
    width: 100%;
    height: 100%;
  }

</style>
