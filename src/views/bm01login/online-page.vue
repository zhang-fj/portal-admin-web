<template>
  <div class="app-container" style="padding-top:15px">
    <div class="head-container">
      <!-- 搜索 -->
      <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
        <span slot="left">
          <label class="el-form-item-label">用户名</label>
          <el-input v-model="query.filter" clearable placeholder="用户名" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        </span>
      </rr-operation>
      <!--表格组件-->
      <el-table ref="table" v-loading="loading" row-key="id" :data="data" highlight-current-row size="mini" style="width: 100%;" @selection-change="selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="nickName" label="用户姓名" />
        <el-table-column prop="ip" label="登录IP" />
        <el-table-column :show-overflow-tooltip="true" prop="address" label="登录地点" />
        <el-table-column prop="browser" label="浏览器" />
        <el-table-column prop="loginTime" label="登录时间" />
        <el-table-column label="操作" width="150px" fixed="right">
          <template slot-scope="scope">
            <ud-operation :data="scope.row" :show-edit="false" del-btn-text="强退" msg="确定强制退出该用户吗？" btn-type="text" :scope="scope" @do-delete-handler="doDelete" />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>

import { page, del } from '@/api/bm01login/online-api' // 导入【查询】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入

import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】
import UdOperation from '@curd/UD.operation.vue' // 导入【列操作组件】

export default {
  name: 'OnlinePage',
  delLoading: false,
  components: { Pagination, RrOperation, UdOperation },
  mixins: [mixinsCurdPage],
  data() {
    return {
      idField: 'key',
      title: '在线用户',
      api: { page, del }
    }
  },
  created() {
    this.optShow = {
      add: false,
      edit: false,
      del: false,
      download: false
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
