<template>
  <div class="app-container" style="padding-top:15px">
    <div class="head-container">
      <!-- 搜索 -->
      <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
        <span slot="left">
          <label class="el-form-item-label">文件扩展名</label>
          <el-input v-model="query.ext" clearable placeholder="文件扩展名" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
          <label class="el-form-item-label">原始文件名</label>
          <el-input v-model="query.oriFileName" clearable placeholder="原始文件名" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        </span>
      </rr-operation>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <curd-operation>
        <span slot="left">
          <file-upload :src-id="'upload-demo'" :type="defaultQuery.type" @upload-success="toQuery">
            <el-button size="mini" type="primary" icon="el-icon-upload2">上传</el-button>
          </file-upload>
        </span>
      </curd-operation>
      <!--表格组件-->
      <el-table ref="table" v-loading="loading" :data="data" highlight-current-row size="mini" style="width: 100%;" @selection-change="selectionChangeHandler">
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column prop="typeName" label="业务类型" />
        <el-table-column prop="ext" label="文件扩展名" />
        <el-table-column prop="oriFileName" label="原始文件名" />
        <el-table-column prop="storeFileName" label="存储文件名" />
        <el-table-column prop="storePath" label="存储路径" />
        <el-table-column label="操作" width="220px" align="center">
          <template slot-scope="scope">
            <ud-operation :data="scope.row" :scope="scope" :show-edit="false" @to-edit-handler="toEdit" @do-delete-handler="doDelete">
              <template slot="right">
                <el-button size="mini" type="info" icon="el-icon-download" @click="download(scope.row.fileid)" />
                <el-button size="mini" type="success" icon="el-icon-data-line" @click="view(scope.row.fileid)" />
              </template>
            </ud-operation>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>

import { page, del } from '@/api/bm03sys/attachment-file-api' // 导入【查询】和【删除】api

import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入
import FileUtil from '@/mixins/file/file-util' // 导入【列表】混入

import FileUpload from '@/components/FileUpload'
import CurdOperation from '@curd/CURD.operation.vue' // 导入【列表操作】组件
import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】
import UdOperation from '@curd/UD.operation.vue' // 导入【列操作组件】

export default {
  name: 'AttachmentFilePage',
  components: { CurdOperation, Pagination, RrOperation, UdOperation, FileUpload },
  mixins: [mixinsCurdPage, FileUtil],
  dicts: [],
  data() {
    return {
      defaultQuery: { type: 'UPLOAD_DEMO' },
      title: '附件上传',
      api: { page, del },
      optShow: {
        add: false,
        edit: false
      }
    }
  }
}
</script>

<style scoped>

</style>
