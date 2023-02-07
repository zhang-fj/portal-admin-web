<template>
  <div class="app-container" style="padding-top:15px">
    <div class="head-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="baseinfo">
          <div style="text-align: center;margin-bottom:15px">
            <table class="user-info-table">
              <tr>
                <td class="user-info-lable">登录账号</td>
                <td class="user-info-text">{{ user.userName }}</td>
                <td class="user-info-lable">员工姓名</td>
                <td class="user-info-text">{{ user.empCode }}</td>
                <td class="user-info-image" rowspan="3">
                  <div class="el-upload">
                    <img title="点击上传头像" :src="$store.state.user.headImagePath" class="avatar" @click="show = !show">
                    <image-crop-upload
                      v-model="show"
                      field="file"
                      :headers="headers"
                      :params="{ srcId: $store.state.user.user.userid, category:'USER_HEAD_IMG' }"
                      :url="$store.state.api.fileUploadApi"
                      @crop-upload-success="cropUploadSuccess"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td class="user-info-lable">员工职务</td>
                <td class="user-info-text">{{ user.empBusiness }}</td>
                <td class="user-info-lable">员工类型</td>
                <td class="user-info-text">{{ user.empType }}</td>
              </tr>
              <tr>
                <td class="user-info-lable">电子邮箱</td>
                <td class="user-info-text">{{ user.empEmail }}</td>
                <td class="user-info-lable">联系方式</td>
                <td class="user-info-text">{{ user.empPhone }}</td>
              </tr>
            </table>
          </div>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="岗位信息" name="1">
              <el-tag v-for="post in posts" :key="post.postId" style="margin-right:10px" effect="dark">{{ post.postName }}【{{ post.postCode }}】</el-tag>
            </el-collapse-item>
            <el-collapse-item title="角色信息" name="2">
              <el-tag v-for="role in roles" :key="role.roleId" style="margin-right:10px" type="success" effect="dark">{{ role.roleName }}【{{ role.roleCode }}】</el-tag>
            </el-collapse-item>
            <el-collapse-item title="功能信息" name="3">
              <span v-for="func in funcs" :key="func.funcId" style="display:block">
                <el-tag style="margin-right:10px;margin-bottom:5px" :type="func.children.length==0?'warning':'danger'" effect="dark">{{ func.funcShortName }}</el-tag>
                <span v-for="children1 in func.children" :key="children1.funcId">
                  <el-tag style="margin-right:10px;margin-bottom:5px" :type="children1.children.length==0?'warning':'danger'" effect="dark">{{ children1.funcShortName }}</el-tag>
                  <span v-for="children2 in children1.children" :key="children2.funcId">
                    <el-tag style="margin-right:10px;margin-bottom:5px" :type="children2.children.length==0?'warning':'danger'" effect="dark">{{ children2.funcShortName }}</el-tag>
                    <span v-for="children3 in children2.children" :key="children3.funcId">
                      <el-tag style="margin-right:10px;margin-bottom:5px" :type="children3.children.length==0?'warning':'danger'" effect="dark">{{ children3.funcShortName }}</el-tag>
                    </span>
                  </span>
                </span>
              </span>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="密码修改" name="security">
          <el-form ref="editPasswordForm" :model="editPasswordData" label-width="80px" :rules="rules">
            <el-form-item label="原密码" prop="password">
              <el-input v-model="editPasswordData.password" type="password" style="width:200px" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="editPasswordData.newPassword" style="width:200px" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="editPasswordData.confirmPassword" style="width:200px" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="mini" @click="editPassword">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="操作日志" name="log">
          <user-center-log />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

import { page, del } from '@/api/bm03sys/log-info-api' // 导入【查询】和【删除】api
import { getUserinfo, editPassword } from '@/api/bm03sys/user-api' // 导入【查询】和【删除】api
// import FileUpload from '@/components/FileUpload' // 导入【查询】和【删除】api
import ImageCropUpload from 'vue-image-crop-upload'

import UserCenterLog from './user-center-log' // 导入【查询组件】

import { getToken } from '@/utils/auth'

export default {
  name: 'UserCenter',
  components: { UserCenterLog, ImageCropUpload },
  data() {
    const validateNewPassword = (rule, value, callback) => {
      if (value === this.editPasswordData.password) {
        callback(new Error('新密码不能与原密码相同!'))
      } else {
        callback()
      }
    }
    const validateNewPassword2 = (rule, value, callback) => {
      if (value !== this.editPasswordData.newPassword) {
        callback(new Error('与新密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      show: false,
      fileid: '',
      headers: { 'Authorization': getToken() },
      api: { page, del },
      optShow: {
        add: false,
        edit: false,
        del: false
      },
      activeNames: ['1', '2', '3'],
      activeName: 'baseinfo',
      user: {
        username: 'admin'
      },
      posts: [],
      roles: [],
      funcs: [],
      editPasswordData: {},
      rules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请设置新密码', trigger: 'blur' },
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: validateNewPassword2, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getUserinfo({ id: this.$store.state.user.user.userid }).then(res => {
        this.user = res.user
        this.posts = res.posts
        this.roles = res.roles
        this.funcs = res.funcs
      })
    },
    editPassword() {
      this.$refs.editPasswordForm.validate(valid => {
        if (valid) {
          editPassword(this.editPasswordData).then(res => {
            this.$message({
              message: '修改密码成功！',
              type: 'success'
            })
          })
        } else {
          this.$message.error('请正确填写表单')
          return false
        }
      })
    },
    // 上传成功回调
    cropUploadSuccess(jsonData, field) {
      this.$store.dispatch('reloadUserHeadImage')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info {
    padding-left: 0;
    list-style: none;
    li{
      border-bottom: 1px solid #F0F3F4;
      padding: 11px 0;
      font-size: 13px;
    }
    .user-right {
      float: right;
      a{
        color: #317EF3;
      }
    }
  }

  .user-info-table{
    margin: auto;
    border-collapse:collapse
  }

  .user-info-table tr td{
    border: 1px #e6ebf5 solid;
    padding: 10px;
  }

  .user-info-table tr td.user-info-lable{
    background-color: #f2f9fb;
    width: 120px;
  }

  .user-info-table tr td.user-info-text{
    width: 280px;
  }

  .user-info-table tr td.user-info-image{
    width: 130px;
  }
</style>
