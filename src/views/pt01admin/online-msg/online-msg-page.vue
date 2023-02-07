<template>
  <div class="head-container">
    <!-- 搜索 -->
    <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
      <span slot="left">
        <label class="el-form-item-label">姓名</label>
        <el-input v-model="query.name" clearable placeholder="姓名" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">电话</label>
        <el-input v-model="query.mobile" clearable placeholder="电话" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">邮箱</label>
        <el-input v-model="query.email" clearable placeholder="邮箱" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">内容</label>
        <el-input v-model="query.content" clearable placeholder="内容" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
      </span>
    </rr-operation>
    <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
    <curd-operation />
    <!--表格组件-->
    <el-table ref="table" v-loading="loading" :data="data" highlight-current-row size="mini" style="width: 100%;" @selection-change="selectionChangeHandler">
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="mobile" label="电话" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="content" label="内容" />
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <ud-operation :show-edit="false" :data="scope.row" :scope="scope" @to-edit-handler="toEdit" @do-delete-handler="doDelete" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单弹框-->
    <curd-dialog :visible="dialog" width="500px" :close-on-click-modal="false" :loading="submitBtnLoading" :title="title" @cancel-cu-handler="cancelCU" @submit-cu-handler="submitCU">
      <online-msg-form ref="form" :data="formData" @submit-after-handler="submitAfterHandler" @submit-before-handler="submitBeforeHandler" @submit-error-handler="submitErrorHander" />
    </curd-dialog>
  </div>
</template>

<script>

import { page, del } from '@/api/pt01admin/online-msg-api' // 导入【查询】和【删除】api

import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入

import CurdOperation from '@curd/CURD.operation.vue' // 导入【列表操作】组件
import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】
import UdOperation from '@curd/UD.operation.vue' // 导入【列操作组件】

import CurdDialog from '@curd/CURD.Dialog.vue' // 导入【表单弹框】组件S
import OnlineMsgForm from './online-msg-form' // 导入【表单】组件

export default {
  name: 'OnlineMsgPage',
  components: { CurdOperation, Pagination, RrOperation, UdOperation, CurdDialog, OnlineMsgForm },
  mixins: [mixinsCurdPage],
  dicts: ['T_CODE_IF'],
  data() {
    return {
      title: '在线留言',
      api: { page, del },
      optShow: {
        add: false,
        edit: false,
        del: true,
        download: false,
        reset: true
      }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
