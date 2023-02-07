<template>
  <div class="app-container" style="padding-top:15px">
    <div class="head-container">
      <!-- 搜索 -->
      <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
        <span slot="left">
          <label class="el-form-item-label">日志类型</label>
          <el-select v-model="query.logType" clearable filterable placeholder="请选择" class="filter-item" style="width: 250px;" @change="toQuery">
            <el-option
              v-for="item in [{value:'INFO',lable:'操作日志'},{value:'ERROR',lable:'错误日志'}]"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            />
          </el-select>
          <label class="el-form-item-label">全局模糊查询</label>
          <el-input v-model="query.blurry" clearable placeholder="全局模糊查询" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        </span>
      </rr-operation>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <curd-operation>
        <el-button
          slot="left"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :loading="delAllLoading"
          @click="confirmDelAll()"
        >
          清空
        </el-button>
      </curd-operation>
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
        <el-table-column prop="inputTime" label="创建日期" />
        <el-table-column label="异常详情" width="100px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.logType == 'ERROR'" size="mini" type="text" @click="info(scope.row.logId)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialog" title="异常详情" append-to-body width="85%">
        <pre v-highlightjs="errorInfo"><code style="height:800px" class="java" /></pre>
      </el-dialog>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>

import { page, del, load } from '@/api/bm03sys/log-info-api' // 导入【查询】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入

import CurdOperation from '@curd/CURD.operation.vue' // 导入【列表操作】组件
import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】

export default {
  name: 'LoggingPage',
  components: { CurdOperation, Pagination, RrOperation },
  mixins: [mixinsCurdPage],
  dicts: [],
  data() {
    return {
      errorInfo: '',
      title: '日志管理',
      api: { page, del },
      optShow: {
        add: false,
        edit: false,
        del: false
      }
    }
  },
  methods: {
    // 获取异常详情
    info(id) {
      this.dialog = true
      load(id).then(res => {
        this.errorInfo = res.exceptionDetail
      })
    },
    confirmDelAll() {
      this.$confirm(`确认清空所有日志吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delAllLoading = true
        del().then(res => {
          this.delAllLoading = false
          this.toQuery()
        }).catch(err => {
          this.delAllLoading = false
          console.log(err.response.data.message)
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>

</style>
