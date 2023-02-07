<template>
  <el-form ref="form" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
    <el-row>
      <el-col :span="20">
        <el-form-item label="学生姓名" prop="studName">
          <el-input v-model="formData.studName" style="width: 220px;" />
        </el-form-item>
        <el-form-item label="身份证号" prop="studIdcard">
          <el-input v-model="formData.studIdcard" style="width: 220px;" />
        </el-form-item>
        <el-form-item label="性别" prop="studGender">
          <el-select v-model="formData.studGender" filterable placeholder="请选择" style="width: 220px;">
            <el-option
              v-for="item in dict.T_CODE_GENDER"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属班级" prop="studClass">
          <el-input v-model="formData.studClass" style="width: 220px;" />
        </el-form-item>
        <el-form-item label="学号" prop="studN0">
          <el-input v-model="formData.studN0" style="width: 220px;" />
        </el-form-item>
        <el-form-item label="手机号码" prop="studPhone">
          <el-input v-model="formData.studPhone" style="width: 220px;" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <div class="photo_box">
          <img ref="photoImage" class="photo_image" :src="getPhotoImagePath()" @click="show = true && formData.id !=null && formData.id !=''">
          <image-crop-upload
            v-model="show"
            field="file"
            :headers="headers"
            :params="{ srcId: formData.id, category:'STUDENT_PHOTO' }"
            :url="$store.state.api.fileUploadApi"
            @crop-upload-success="cropUploadSuccess"
          />
        </div>

      </el-col>
    </el-row>
    <el-form-item label="邮件地址" prop="studEmail">
      <el-input v-model="formData.studEmail" style="width: 670px;" />
    </el-form-item>
    <el-form-item label="学生简历" prop="studResume">
      <el-input v-model="formData.studResume" type="textarea" :rows="10" style="width: 670px;" />
    </el-form-item>
  </el-form>
</template>

<script>
import { validateIdNo, validatePhone, validateEmail } from '@/utils/validate.js'
import { load, save } from '@/api/bm04demo/demoStudent/demo-student-api' // 导入【保存】和【加载】数据服务接口
import mixinsCurdForm from '@/mixins/curd/mixins-curd-form' // 导入【表单操作】混入

import { getToken } from '@/utils/auth'
import ImageCropUpload from 'vue-image-crop-upload'

export default {
  name: 'DemoStudentForm',
  components: { ImageCropUpload },
  mixins: [mixinsCurdForm],
  dicts: ['T_CODE_GENDER'],
  data() {
    return {
      api: { load, save },
      show: false,
      headers: { 'Authorization': getToken() },
      defaultFormData: {},
      rules: {
        studName: [
          { required: true, message: '学生姓名不能为空', trigger: 'blur' }
        ],
        studIdcard: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' },
          { validator: validateIdNo, trigger: 'blur' }
        ],
        studGender: [
          { required: true, message: '性别不能为空', trigger: 'blur' }
        ],
        studClass: [
          { required: true, message: '所属班级不能为空', trigger: 'blur' }
        ],
        studN0: [
          { required: true, message: '学号不能为空', trigger: 'blur' }
        ],
        studPhone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        studEmail: [
          { required: true, message: '邮件地址不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 上传成功回调
    cropUploadSuccess(jsonData, field) {
      this.$refs.photoImage = this.getPhotoImagePath()
    },
    getPhotoImagePath() {
      return this.$store.state.api.fileDownloadApi + '?srcId=' + this.formData.id + '&type=STUDENT_PHOTO&isImage=true&dt=' + new Date().getTime()
    }
  }
}
</script>

<style scoped>
  .photo_box{
    width: 120px;
    height: 135px;
    padding: 5px;
    border: 2px #46a6ff dashed;
  }
  .photo_image{
    width: 100%;
    height: 100%;
  }
</style>
