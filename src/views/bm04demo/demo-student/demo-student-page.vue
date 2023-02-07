<template>
  <div class="head-container">
    <!-- 搜索 -->
    <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
      <span slot="left">
        <label class="el-form-item-label">学生姓名</label>
        <el-input v-model="query.studName" clearable placeholder="学生姓名" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">身份证号</label>
        <el-input v-model="query.studIdcard" clearable placeholder="身份证号" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">学生性别</label>
        <el-select v-model="query.studGender" class="filter-item" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in dict.T_CODE_GENDER"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <label class="el-form-item-label">学号</label>
        <el-input v-model="query.studN0" clearable placeholder="学号" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">手机号码</label>
        <el-input v-model="query.studPhone" clearable placeholder="手机号码" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
      </span>
    </rr-operation>
    <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
    <curd-operation />
    <!--表格组件-->
    <el-table ref="table" v-loading="loading" :data="data" highlight-current-row size="mini" style="width: 100%;" @selection-change="selectionChangeHandler">
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column prop="studName" label="学生姓名" />
      <el-table-column prop="studIdcard" label="身份证号" />
      <el-table-column prop="studGender" label="学生性别">
        <template slot-scope="scope">
          {{ dict.label.T_CODE_GENDER[scope.row.studGender] }}
        </template>
      </el-table-column>
      <el-table-column prop="studClass" label="所属班级" />
      <el-table-column prop="studN0" label="学号" />
      <el-table-column prop="studPhone" label="手机号码" />
      <el-table-column prop="studEmail" label="邮件地址" />
      <el-table-column prop="studPhoto" label="学生照片" />
      <el-table-column prop="studResume" label="学生简历" />
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <ud-operation :data="scope.row" :scope="scope" @to-edit-handler="toEdit" @do-delete-handler="doDelete" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单弹框-->
    <curd-dialog :visible="dialog" :loading="submitBtnLoading" :title="title" @cancel-cu-handler="cancelCU" @submit-cu-handler="submitCU">
      <demo-student-form ref="form" :data="formData" @submit-after-handler="submitAfterHandler" @submit-before-handler="submitBeforeHandler" @submit-error-handler="submitErrorHander" />
    </curd-dialog>
  </div>
</template>

<script>

import { page, del } from '@/api/bm04demo/demoStudent/demo-student-api' // 导入【查询】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入

import CurdOperation from '@curd/CURD.operation.vue' // 导入【列表操作】组件
import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】
import UdOperation from '@curd/UD.operation.vue' // 导入【列操作组件】

import CurdDialog from '@curd/CURD.Dialog.vue' // 导入【表单弹框】组件S
import demoStudentForm from './demo-student-form' // 导入【表单】组件

export default {
  name: 'DemoStudentPage',
  components: { CurdOperation, Pagination, RrOperation, UdOperation, CurdDialog, demoStudentForm },
  mixins: [mixinsCurdPage],
  dicts: ['T_CODE_GENDER'],
  data() {
    return {
      title: '学生演示',
      api: { page, del }
    }
  },
  methods: {
    submitAfterHandler(result, form) {
      this.$emit('submit-after-handler', result, form)
      this.submitBtnLoading = false
      this.toQuery()
    }
  }
}
</script>

<style scoped>

</style>
