<template>
  <div class="head-container">
    <!-- 搜索 -->
    <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
      <span slot="left">
        <label class="el-form-item-label">岗位编码</label>
        <el-input v-model="query.postCode" clearable placeholder="岗位编码" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">岗位名称</label>
        <el-input v-model="query.postName" clearable placeholder="岗位名称" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
      </span>
    </rr-operation>
    <!--表格组件-->
    <el-table ref="table" v-loading="loading" :data="data" highlight-current-row size="mini" height="500px" style="width: 100%;" @row-click="rowClickHandler">
      <!-- <el-table-column align="center" type="selection" width="55" /> -->
      <el-table-column prop="postCode" label="岗位编码" />
      <el-table-column prop="postName" label="岗位名称" />
      <el-table-column prop="postDesc" label="岗位描述" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>

import { page } from '@/api/bm02priv/post-api' // 导入【查询】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入

import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】

export default {
  name: 'PostPage',
  components: { Pagination, RrOperation },
  mixins: [mixinsCurdPage],
  dicts: [],
  data() {
    return {
      title: '岗位管理',
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
