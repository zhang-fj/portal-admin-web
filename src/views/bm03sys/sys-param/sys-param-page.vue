<template>
  <div class="head-container">
    <!-- 搜索 -->
    <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
      <span slot="left">
        <label class="el-form-item-label">参数编码</label>
        <el-input v-model="query.paramId" clearable placeholder="参数编码" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">参数值</label>
        <el-input v-model="query.paramValue" clearable placeholder="参数值" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">参数描述</label>
        <el-input v-model="query.paramDesc" clearable placeholder="参数描述" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">备注</label>
        <el-input v-model="query.remark" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
      </span>
    </rr-operation>
    <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
    <curd-operation />
    <!--表格组件-->
    <el-table ref="table" v-loading="loading" :data="data" highlight-current-row size="mini" style="width: 100%;" @selection-change="selectionChangeHandler">
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column prop="paramId" label="参数编码" />
      <el-table-column prop="paramValue" label="参数值" />
      <el-table-column prop="paramDesc" label="参数描述" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="inputTime" label="录入时间" />
      <el-table-column prop="updateTime" label="修改时间（使用）" />
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <ud-operation :data="scope.row" :scope="scope" @to-edit-handler="toEdit" @do-delete-handler="doDelete" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单弹框-->
    <curd-dialog :visible="dialog" :loading="submitBtnLoading" width="500px" :title="title" @cancel-cu-handler="cancelCU" @submit-cu-handler="submitCU">
      <sys-param-form ref="form" :data="formData" @submit-after-handler="submitAfterHandler" @submit-before-handler="submitBeforeHandler" @submit-error-handler="submitErrorHander" />
    </curd-dialog>
  </div>
</template>

<script>

import { page, del } from '@/api/bm03sys/sys-param-api' // 导入【查询】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入

import CurdOperation from '@curd/CURD.operation.vue' // 导入【列表操作】组件
import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】
import UdOperation from '@curd/UD.operation.vue' // 导入【列操作组件】

import CurdDialog from '@curd/CURD.Dialog.vue' // 导入【表单弹框】组件S
import sysParamForm from './sys-param-form' // 导入【表单】组件

export default {
  name: 'SysParamPage',
  components: { CurdOperation, Pagination, RrOperation, UdOperation, CurdDialog, sysParamForm },
  mixins: [mixinsCurdPage],
  dicts: [],
  data() {
    return {
      title: '系统参数',
      api: { page, del },
      optShow: {
        del: false,
        edit: false
      }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
