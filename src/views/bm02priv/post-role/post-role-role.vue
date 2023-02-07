<template>
  <div class="head-container">
    <!-- 搜索 -->
    <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
      <span slot="left">
        <label class="el-form-item-label">角色编码</label>
        <el-input v-model="query.roleCode" clearable placeholder="角色编码" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">角色名称</label>
        <el-input v-model="query.roleName" clearable placeholder="角色名称" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
      </span>
      <span slot="right">
        <el-button
          class="filter-item"
          :loading="submiting"
          size="mini"
          type="primary"
          icon="el-icon-check"
          @click="submit()"
        >保存</el-button>
      </span>
    </rr-operation>
    <!--表格组件-->
    <el-table
      ref="table"
      v-loading="loading"
      row-key="roleId"
      :data="data"
      highlight-current-row
      size="mini"
      height="500px"
      style="width: 100%;"
      @selection-change="selectionChangeHandler"
      @current-change="currentChangeHandler"
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="roleDesc" label="角色描述" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>

import { page } from '@/api/bm02priv/role-api' // 导入【查询】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入

import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】

export default {
  name: 'RolePage',
  components: { Pagination, RrOperation },
  mixins: [mixinsCurdPage],
  dicts: [],
  data() {
    return {
      submiting: false,
      title: '角色管理',
      api: { page }
    }
  },
  methods: {
    submit() {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>

</style>
