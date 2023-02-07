<template>
  <div class="head-container">
    <!-- 搜索 -->
    <rr-operation :search-toggle="searchToggle" :loading="loading" @to-query-handler="toQuery" @reset-query-handler="resetQuery">
      <span slot="left">
        <div>
          <label class="el-form-item-label">栏目名称</label>
          <el-radio-group v-model="query.topicId" size="small" class="filter-item" @change="topicChangeHandle">
            <el-radio-button v-for="item in datamap['topics']" :key="item.topicId" :label="item.topicId" @click.native="topicClickHandler(item)">{{ item.topicName }}</el-radio-button>
          </el-radio-group>
        </div>
        <div v-if="datamap['cates']&&datamap['cates'].length > 0 ">
          <label class="el-form-item-label">分类名称</label>
          <el-radio-group v-model="query.cateId" size="small" class="filter-item" @change="cateChangeHandle">
            <el-radio-button v-for="item in datamap['cates']" :key="item.cateId" :label="item.cateId">{{ item.cateName }}</el-radio-button>
          </el-radio-group>
        </div>
        <label class="el-form-item-label">信息标题</label>
        <el-input v-model="query.title" clearable placeholder="标题" style="width: 185px;" class="filter-item" @keyup.enter.native="toQuery" />
        <label class="el-form-item-label">信息状态</label>
        <el-select v-model="query.status" class="filter-item" clearable filterable placeholder="请选择" @change="toQuery">
          <el-option
            v-for="item in dict.T_CODE_STATUS"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
    </rr-operation>
    <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
    <curd-operation>
      <template slot="right">
        <el-button type="primary" size="mini" :loading="releaseLoading" @click="release">发布</el-button>
        <el-button type="warning" size="mini" :loading="backLoading" @click="back">撤销发布</el-button>
      </template>
    </curd-operation>
    <!--表格组件-->
    <el-table ref="table" v-loading="loading" :data="data" highlight-current-row size="mini" style="width: 100%;" @selection-change="selectionChangeHandler">
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column prop="title" label="信息标题" />
      <!-- <el-table-column prop="mainImgUrl" label="主要图片" /> -->
      <!-- <el-table-column prop="desc" label="信息描述" :formatter="descFormater" /> -->
      <el-table-column prop="status" label="信息状态">
        <template slot-scope="scope">
          {{ dict.label.T_CODE_STATUS[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column prop="releaseUser" label="发布人" />
      <el-table-column prop="releaseTime" label="发布时间" />
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <ud-operation :data="scope.row" :scope="scope" @to-edit-handler="toEdit" @do-delete-handler="doDelete" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单弹框-->
    <curd-dialog v-if="topic.infoType == 'YQLJ'" :visible="dialog" :width="'520px'" :close-on-click-modal="false" :loading="submitBtnLoading" :title="title" @cancel-cu-handler="cancelCU" @submit-cu-handler="submitCU">
      <topic-yqlj-info-form ref="form" :data="formData" @submit-after-handler="submitAfterHandler" @submit-before-handler="submitBeforeHandler" @submit-error-handler="submitErrorHander" />
    </curd-dialog>
    <curd-dialog v-else-if="topic.infoType == 'ZLXZ'" :visible="dialog" :width="'900px'" :close-on-click-modal="false" :loading="submitBtnLoading" :title="title" @cancel-cu-handler="cancelCU" @submit-cu-handler="submitCU">
      <topic-zlxz-info-form ref="form" :data="formData" @submit-after-handler="submitAfterHandler" @submit-before-handler="submitBeforeHandler" @submit-error-handler="submitErrorHander" />
    </curd-dialog>
    <curd-dialog v-else-if="topic.infoType == 'LBTP'" :visible="dialog" :width="'520px'" :close-on-click-modal="false" :loading="submitBtnLoading" :title="title" @cancel-cu-handler="cancelCU" @submit-cu-handler="submitCU">
      <topic-lbtp-info-form ref="form" :data="formData" @submit-after-handler="submitAfterHandler" @submit-before-handler="submitBeforeHandler" @submit-error-handler="submitErrorHander" />
    </curd-dialog>
    <curd-dialog v-else :visible="dialog" :width="'1236px'" :close-on-click-modal="false" :loading="submitBtnLoading" :title="title" @cancel-cu-handler="cancelCU" @submit-cu-handler="submitCU">
      <topic-info-form :key="topic.topicId" ref="form" :data="formData" @submit-after-handler="submitAfterHandler" @submit-before-handler="submitBeforeHandler" @submit-error-handler="submitErrorHander" />
    </curd-dialog>
  </div>
</template>

<script>

import { page, del, release, back } from '@/api/pt01admin/topic-info-api' // 导入【查询】和【删除】api
import { page as topics } from '@/api/pt01admin/topic-api' // 导入【查询】api
import { page as cates } from '@/api/pt01admin/info-cate-api' // 导入【查询】和【删除】api

import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入
import mixinsDatas from '@/mixins/curd/mixins-select-data' // 导入【获取数据接口】混入

import CurdOperation from '@curd/CURD.operation.vue' // 导入【列表操作】组件
import Pagination from '@curd/Pagination.vue' // 导入【分页组件】
import RrOperation from '@curd/RR.operation.vue' // 导入【查询组件】
import UdOperation from '@curd/UD.operation.vue' // 导入【列操作组件】

import CurdDialog from '@curd/CURD.Dialog.vue' // 导入【表单弹框】组件S
import topicInfoForm from './topic-info-form' // 导入【表单】组件
import topicYqljInfoForm from './topic-yqlj-info-form' // 导入【表单】组件
import topicZlxzInfoForm from './topic-zlxz-info-form' // 导入【表单】组件
import topicLbtpInfoForm from './topic-lbtp-info-form' // 导入【表单】组件

export default {
  name: 'TopicInfoPage',
  components: { CurdOperation, Pagination, RrOperation, UdOperation, CurdDialog, topicInfoForm, topicYqljInfoForm, topicZlxzInfoForm, topicLbtpInfoForm },
  mixins: [mixinsCurdPage, mixinsDatas],
  dicts: ['T_CODE_STATUS'],
  props: {
    isRefresh: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      releaseLoading: false,
      backLoading: false,
      cates: [],
      title: '栏目信息',
      apimap: { topics: topics, cates: cates },
      notquerykeys: ['topics', 'cates'],
      api: { page, del },
      topic: {}
    }
  },
  mounted() {
    this.toQueryDataMap('topics', {}, (res) => {
      this.topic = res.data.length === 0 ? {} : res.data[0]
      const topicId = this.topic.topicId
      this.setDefaultQuery('topicId', topicId)
      this.defaultFormData.topicId = topicId
      this.toQuery()
    })
  },
  methods: {
    descFormater(row, column, cellValue, index) {
      return cellValue ? (cellValue.length > 30 ? cellValue.substring(0, 30) + '...' : cellValue) : ''
    },
    topicChangeHandle(value) {
      this.defaultFormData.topicId = value
      this.setDefaultQuery('topicId', value)
      this.toQueryDataMap('cates', { topicId: value }, (res) => {
        const cateId = res.data.length === 0 ? '' : res.data[0].cateId
        this.setDefaultQuery('cateId', cateId)
        this.defaultFormData.cateId = cateId
        this.toQuery()
      })
    },
    topicClickHandler(item) {
      console.info(item)
      this.topic = item
    },
    cateChangeHandle(value) {
      this.setDefaultQuery('cateId', value)
      this.defaultFormData.cateId = value
      this.toQuery()
    },
    // 启动新增
    toAdd() {
      this.defaultFormData.id = this.$uuid.v1()
      this.toForm({ ...this.defaultFormData })
    },
    release() {
      this.releaseLoading = true
      release((this.selections || []).map(item => { return item.id })).then(result => {
        this.$message.success({ message: '发布成功', duration: 3000, showClose: true })
        this.releaseLoading = false
        this.toQuery()
      })
    },
    back() {
      this.backLoading = true
      back((this.selections || []).map(item => { return item.id })).then(result => {
        this.$message.success({ message: '撤销发布成功', duration: 3000, showClose: true })
        this.backLoading = false
        this.toQuery()
      })
    }
  }
}
</script>

<style scoped>

</style>
