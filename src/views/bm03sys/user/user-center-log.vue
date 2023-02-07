<template>
  <div class="app-container" style="padding-top:15px">
    <div class="head-container">
      <!-- 搜索 -->
      <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
        <span slot="left">
          <el-input v-model="query.blurry" clearable placeholder="全局模糊查询" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        </span>
      </rr-operation>
      <!--表格组件-->
      <el-table ref="table" v-loading="loading" :data="data" highlight-current-row size="mini" style="width: 100%;" @selection-change="selectionChangeHandler">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="请求方法">
                <span>{{ props.row.method }}</span>
              </el-form-item>
              <el-form-item label="请求参数">
                <span>{{ props.row.params }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="requestIp" label="IP" />
        <el-table-column :show-overflow-tooltip="true" prop="address" label="IP来源" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="browser" label="浏览器" />
        <el-table-column prop="time" label="请求耗时" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.time <= 300">{{ scope.row.time }}ms</el-tag>
            <el-tag v-else-if="scope.row.time <= 1000" type="warning">{{ scope.row.time }}ms</el-tag>
            <el-tag v-else type="danger">{{ scope.row.time }}ms</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期" width="180px" />
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>

import { userlogs, del } from '@/api/bm03sys/log-info-api' // 导入【查询】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入

import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】

export default {
  name: 'LoggingPage',
  components: { Pagination, RrOperation },
  mixins: [mixinsCurdPage],
  dicts: [],
  data() {
    return {
      errorInfo: '',
      title: '日志管理',
      api: { page: userlogs, del },
      optShow: {
        add: false,
        edit: false,
        del: false
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
