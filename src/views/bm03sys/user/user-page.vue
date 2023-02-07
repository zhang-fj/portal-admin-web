<template>
  <div class="head-container">
    <!-- 搜索 -->
    <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
      <span slot="left">
        <label class="el-form-item-label">员工编号</label>
        <el-input v-model="query.empCode" clearable placeholder="员工编号" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">姓名</label>
        <el-input v-model="query.empName" clearable placeholder="姓名" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">系统登录用户名</label>
        <el-input v-model="query.userName" clearable placeholder="用户名" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">是否锁定  1锁定  0正常</label>
        <el-input v-model="query.isLock" clearable placeholder="是否锁定" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">手机号码</label>
        <el-input v-model="query.empPhone" clearable placeholder="手机号码" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
      </span>
    </rr-operation>
    <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
    <curd-operation />
    <!--表格组件-->
    <el-table ref="table" v-loading="loading" :data="data" highlight-current-row size="mini" style="width: 100%;" @selection-change="selectionChangeHandler">
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="empCode" label="员工编号" />
      <el-table-column prop="empName" label="姓名" />
      <el-table-column prop="empUnitcode" label="所属单位">
        <template slot-scope="scope">
          {{ dict.label.T_DICT_UNIT[scope.row.empUnitcode] }}
        </template>
      </el-table-column>
      <el-table-column prop="empBusiness" label="员工职务" />
      <el-table-column prop="isLock" label="是否锁定">
        <template slot-scope="scope">
          {{ dict.label.T_CODE_IF[scope.row.isLock] }}
        </template>
      </el-table-column>
      <el-table-column prop="empType" label="员工类型" />
      <el-table-column prop="empPhone" label="手机号码" />
      <el-table-column prop="empOrder" label="排序编号" />
      <el-table-column prop="empEmail" label="邮件地址" />
      <!-- <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <ud-operation :data="scope.row" :scope="scope" @to-edit-handler="toEdit" @do-delete-handler="doDelete" />
        </template>
      </el-table-column> -->
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单弹框-->
    <curd-dialog :visible="dialog" :loading="submitBtnLoading" :title="title" @cancel-cu-handler="cancelCU" @submit-cu-handler="submitCU">
      <user-form ref="form" :data="formData" @submit-after-handler="submitAfterHandler" @submit-before-handler="submitBeforeHandler" @submit-error-handler="submitErrorHander" />
    </curd-dialog>
  </div>
</template>

<script>

import { page, del } from '@/api/bm03sys/user-api' // 导入【查询】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入

import CurdOperation from '@curd/CURD.operation.vue' // 导入【列表操作】组件
import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】
// import UdOperation from '@curd/UD.operation.vue' // 导入【列操作组件】

import CurdDialog from '@curd/CURD.Dialog.vue' // 导入【表单弹框】组件S
import userForm from './user-form' // 导入【表单】组件

export default {
  name: 'UserPage',
  components: { CurdOperation, Pagination, RrOperation, CurdDialog, userForm },
  mixins: [mixinsCurdPage],
  dicts: ['T_CODE_IF', 'T_DICT_UNIT'],
  data() {
    return {
      title: '用户管理',
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
