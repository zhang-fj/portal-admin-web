<template>
  <div class="head-container">
    <!-- 搜索 -->
    <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
      <span slot="left">
        <label class="el-form-item-label">栏目名称</label>
        <el-input v-model="query.topicName" clearable placeholder="栏目名称" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">栏目编码</label>
        <el-input v-model="query.topicCode" clearable placeholder="栏目编码" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
      </span>
    </rr-operation>
    <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
    <curd-operation />
    <!--表格组件-->
    <el-table ref="table" v-loading="loading" :data="data" highlight-current-row size="mini" style="width: 100%;" @selection-change="selectionChangeHandler">
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column prop="sort" label="排序" width="55" />
      <el-table-column prop="topicName" label="栏目名称" />
      <el-table-column prop="topicDesc" label="栏目描述" />
      <el-table-column prop="navigateMenu" label="导航菜单">
        <template slot-scope="scope">
          {{ dict.label.T_CODE_IF[scope.row.navigateMenu] }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="topicPath" label="栏目路径" /> -->
      <el-table-column prop="homeDisplay" label="首页展示">
        <template slot-scope="scope">
          {{ dict.label.T_CODE_IF[scope.row.homeDisplay] }}
        </template>
      </el-table-column>
      <el-table-column prop="homeIndex" label="展示位置" />
      <el-table-column prop="homeInfoSize" label="展示条数" />
      <el-table-column prop="homeTemp" label="展示模板">
        <template slot-scope="scope">
          {{ dict.label.T_CODE_HOME_TEMP[scope.row.homeTemp] }}
        </template>
      </el-table-column>
      <el-table-column prop="secondaryTemp" label="二级页模板">
        <template slot-scope="scope">
          {{ dict.label.T_CODE_SECONDARY_TEMP[scope.row.secondaryTemp] }}
        </template>
      </el-table-column>
      <el-table-column prop="infoTemp" label="信息页模板">
        <template slot-scope="scope">
          {{ dict.label.T_CODE_INFO_TEMP[scope.row.infoTemp] }}
        </template>
      </el-table-column>
      <el-table-column prop="infoType" label="信息类型">
        <template slot-scope="scope">
          {{ dict.label.T_CODE_INFO_TYPE[scope.row.infoType] }}
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
      <topic-form ref="form" :data="formData" @submit-after-handler="submitAfterHandler" @submit-before-handler="submitBeforeHandler" @submit-error-handler="submitErrorHander" />
    </curd-dialog>
  </div>
</template>

<script>

import { page, del } from '@/api/pt01admin/topic-api' // 导入【查询】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入
import mixinsDatas from '@/mixins/curd/mixins-select-data' // 导入【获取数据接口】混入

import CurdOperation from '@curd/CURD.operation.vue' // 导入【列表操作】组件
import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】
import UdOperation from '@curd/UD.operation.vue' // 导入【列操作组件】

import CurdDialog from '@curd/CURD.Dialog.vue' // 导入【表单弹框】组件S
import topicForm from './topic-form' // 导入【表单】组件

export default {
  name: 'TopicPage',
  components: { CurdOperation, Pagination, RrOperation, UdOperation, CurdDialog, topicForm },
  mixins: [mixinsCurdPage, mixinsDatas],
  dicts: ['T_CODE_IF', 'T_CODE_HOME_TEMP', 'T_CODE_SECONDARY_TEMP', 'T_CODE_INFO_TEMP', 'T_CODE_INFO_TYPE'],
  data() {
    return {
      title: '栏目管理',
      api: { page, del }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
