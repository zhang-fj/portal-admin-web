<template>
  <div class="head-container">
    <!-- 搜索 -->
    <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
      <span slot="left">
        <label class="el-form-item-label">编码</label>
        <el-input v-model="query.code" clearable placeholder="编码" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">名称</label>
        <el-input v-model="query.name" clearable placeholder="名称" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
      </span>
    </rr-operation>
    <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
    <curd-operation />
    <!--表格组件-->
    <el-form ref="form" :model="editTableForm">
      <el-table ref="table" v-loading="loading" :data="editTableForm.data" highlight-current-row size="mini" style="width: 100%;" row-class-name="edit-table-row" :cell-class-name.sync="setEditCellClassName" @cell-click="onCellClickHandler" @selection-change="selectionChangeHandler">
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column prop="code" label="编码">
          <el-form-item slot-scope="scope" :prop="'data.' + scope.$index + '.code'">
            <el-input v-model="scope.row.code" :disabled="scope.row.opt !== 'add'" class="column-input" />
          </el-form-item>
        </el-table-column>
        <el-table-column prop="name" label="名称">
          <el-form-item slot-scope="scope" :prop="'data.' + scope.$index + '.name'">
            <el-input v-model="scope.row.name" class="column-input" />
          </el-form-item>
        </el-table-column>
        <el-table-column prop="spell" label="拼音简写">
          <el-form-item slot-scope="scope" :prop="'data.' + scope.$index + '.spell'">
            <el-input v-model="scope.row.spell" class="column-input" />
          </el-form-item>
        </el-table-column>
        <el-table-column label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <ud-operation :show-edit="false" :data="scope.row" :scope="scope" @to-edit-handler="toEdit" @do-delete-handler="doDelete" />
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>

import { page, batchSave, del } from '@/api/bm03sys/code-api' // 导入【查询】,【批量保存】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入
import mixinsCurdPageEditor from '@/mixins/curd/mixins-curd-page-editor' // 导入【可编辑表格】混入

import CurdOperation from '@curd/CURD.operation.vue' // 导入【列表操作】组件
import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】
import UdOperation from '@curd/UD.operation.vue' // 导入【列操作组件】

export default {
  name: 'CodePage',
  components: { CurdOperation, Pagination, RrOperation, UdOperation },
  mixins: [mixinsCurdPage, mixinsCurdPageEditor],
  dicts: [],
  data() {
    return {
      title: '字典明细',
      defaultFormData: { 'opt': 'add' },
      api: { page, batchSave, del },
      rules: {
        code: [
          { required: true, message: '编码不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        spell: [
          { required: true, message: '拼音简写不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    callSubmitBefore(data, form) {
      data.adds.forEach(item => {
        item['sysCode'] = this.defaultFormData.sysCode
      })
      data.edits.forEach(item => {
        item['sysCode'] = this.defaultFormData.sysCode
      })
      data.dels.forEach(item => {
        item['sysCode'] = this.defaultFormData.sysCode
      })
      return true
    }
  }
}
</script>

<style scoped>

</style>
