<template>
  <div class="head-container">
    <!-- 搜索 -->
    <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
      <span slot="left">
        <label class="el-form-item-label">员工编号</label>
        <el-input v-model="query.empCode" clearable placeholder="员工编号" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">姓名</label>
        <el-input v-model="query.empName" clearable placeholder="姓名" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">用户名</label>
        <el-input v-model="query.userName" clearable placeholder="用户名" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
      </span>
    </rr-operation>
    <!--表格组件-->
    <el-table ref="table" v-loading="loading" :data="data" highlight-current-row size="mini" height="500px" style="width: 100%;" @row-click="rowClickHandler">
      <!-- <el-table-column align="center" type="selection" width="55" /> -->
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="empCode" label="员工编号" />
      <el-table-column prop="empName" label="员工姓名" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>

import { page } from '@/api/bm03sys/user-api' // 导入【查询】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入

import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】

export default {
  name: 'UserPage',
  components: { Pagination, RrOperation },
  mixins: [mixinsCurdPage],
  dicts: ['T_CODE_IF'],
  data() {
    return {
      submiting: false,
      title: '用户管理',
      api: { page }
    }
  },
  methods: {
    rowClickHandler(row) {
      this.$emit('row-click', row)
    }
  }
}
</script>

<style scoped>

</style>
