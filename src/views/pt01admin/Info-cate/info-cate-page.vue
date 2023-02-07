<template>
  <div class="head-container">
    <!-- 搜索 -->
    <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
      <span slot="left">
        <label class="el-form-item-label">栏目名称</label>
        <el-select v-model="query.topicId" filterable placeholder="请选择" style="width: 185px;" class="filter-item" @change="toQuery">
          <el-option
            v-for="item in datamap['topics']"
            :key="item.id"
            :label="item.topicName"
            :value="item.id"
          />
        </el-select>
        <label class="el-form-item-label">分类名称</label>
        <el-input v-model="query.cateName" clearable placeholder="分类名称" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">分类编码</label>
        <el-input v-model="query.cateCode" clearable placeholder="分类编码" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">分类状态</label>
        <el-select v-model="query.status" class="filter-item" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in status"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
    </rr-operation>
    <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
    <curd-operation />
    <!--表格组件-->
    <el-table ref="table" v-loading="loading" :data="data" highlight-current-row size="mini" style="width: 100%;" @selection-change="selectionChangeHandler">
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column prop="topicId" label="栏目名称">
        <template slot-scope="scope">
          {{ getSelectNameByValue('topics',scope.row.topicId,'topicName') }}
        </template>

      </el-table-column>
      <el-table-column prop="cateName" label="分类名称" />
      <el-table-column prop="cateCode" label="分类编码" />
      <el-table-column prop="sort" label="排序字段" />
      <el-table-column prop="status" label="分类状态">
        <template slot-scope="scope">
          {{ scope.row.status===0?'禁用':'启用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <ud-operation :data="scope.row" :scope="scope" @to-edit-handler="toEdit" @do-delete-handler="doDelete" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单弹框-->
    <curd-dialog :visible="dialog" :close-on-click-modal="false" :loading="submitBtnLoading" :title="title" @cancel-cu-handler="cancelCU" @submit-cu-handler="submitCU">
      <info-cate-form ref="form" :data="formData" @submit-after-handler="submitAfterHandler" @submit-before-handler="submitBeforeHandler" @submit-error-handler="submitErrorHander" />
    </curd-dialog>
  </div>
</template>

<script>

import { page, del } from '@/api/pt01admin/info-cate-api' // 导入【查询】和【删除】api
import { page as topics } from '@/api/pt01admin/topic-api' // 导入【查询】api

import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入
import mixinsDatas from '@/mixins/curd/mixins-select-data' // 导入【获取数据接口】混入

import CurdOperation from '@curd/CURD.operation.vue' // 导入【列表操作】组件
import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】
import UdOperation from '@curd/UD.operation.vue' // 导入【列操作组件】

import CurdDialog from '@curd/CURD.Dialog.vue' // 导入【表单弹框】组件S
import InfoCateForm from './info-cate-form' // 导入【表单】组件

export default {
  name: 'InfoCatePage',
  components: { CurdOperation, Pagination, RrOperation, UdOperation, CurdDialog, InfoCateForm },
  mixins: [mixinsCurdPage, mixinsDatas],
  dicts: ['T_CODE_IF'],
  data() {
    return {
      title: '信息分类',
      apimap: { topics: topics },
      status: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }],
      api: { page, del }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
