<template>
  <div class="app-container" style="padding-top:15px">
    <el-container>
      <el-aside width="300px" style="padding:0px;background:#ffffff">
        <el-tree
          ref="funcTree"
          node-key="id"
          :props="defaultProps"
          :expand-on-click-node="false"
          :default-expanded-keys="['-1']"
          lazy
          :load="loadNode"
          @node-click="handleNodeClick"
        >
          <template v-slot="{data}">
            <span class="custom-tree-node">
              <span class="el-tree-node__label">
                {{ data.funcName+'('+data.subFuncCount+')' }}
              </span>
              <span>
                <el-button v-if="data.isLeaf === '0'" type="text" @click.stop="()=>{ toAdd(data) }">添加</el-button>
                <el-button v-if="data.id !== '-1'" :disabled="data.subFuncCount > 0" type="text" @click.stop="()=>{ toDel(data) }">删除</el-button>
              </span>
            </span>
          </template>
        </el-tree>
      </el-aside>
      <el-main style="padding:0px;margin-left:15px">
        <el-divider content-position="left">上级功能：{{ data.upFuncName }}</el-divider>
        <div style="width:800px">
          <div class="crud-opts">
            <span class="crud-opts-left">
              <el-button type="primary" size="mini" :loading="loading" @click="$refs.funcForm.submitCU()">保存</el-button>
            </span>
          </div>
          <func-form ref="funcForm" :data="data" @submit-after-handler="submitAfterHandler" @submit-before-handler="loading=true" @submit-error-handler="loading=false" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import { list, del } from '@/api/bm02priv/func-api' // 导入【查询】,【批量保存】和【删除】api

import FuncForm from './func-form.vue'

export default {
  components: { FuncForm },
  data() {
    return {
      params: {},
      data: {},
      defaultProps: { children: 'children', label: (data, node) => { return data.funcName }, isLeaf: function(data) { return data.subFuncCount === 0 } },
      loading: false
    }
  },
  mounted() {
    this.toAdd({ id: '-1', funcName: '功能树', isLeaf: '0' })
  },
  methods: {
    toAdd(data) {
      this.data = { upFuncUuid: data.id, upFuncName: data.funcName, isLeaf: '0' }
      this.$refs.funcForm.load(this.data)
    },
    toDel(data) {
      this.$confirm(`确认删除菜单【${data.funcName}】?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delAllLoading = true
        del([data.id]).then(result => {
          this.refreshMenuNodeBy(data.upFuncUuid)
        }).catch(() => {})
      }).catch(() => {
      })
    },
    submitAfterHandler(result) {
      this.loading = false
      this.data = result
      this.refreshMenuNodeBy(this.data.upFuncUuid)
    },
    handleNodeClick(data, node, tree) {
      if (data.id === '-1') {
        this.toAdd(data)
      } else {
        this.data = data
        this.data.upFuncName = node.parent.data.funcName
      }
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        resolve([{ id: '-1', funcName: '功能树', isLeaf: '0', subFuncCount: 0 }])
      } else {
        list({ pid: node.data.id }).then((res) => {
          node.data.subFuncCount = res.length
          resolve(res)
        }).catch(() => {})
      }
    },
    refreshMenuNodeBy(id) {
      const node = this.$refs.funcTree.getNode(id)
      node.loaded = false
      node.expand()
    },
    nodeDropHandler(draggingNode, dropNode, type) {
      return true
    },
    allowDropHandler(draggingNode, dropNode, type) {
      return !(dropNode.level === 1 && type !== 'inner')
    },
    allowDragHandler(draggingNode) {
      return draggingNode.level !== 1
    }
  }
}

</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
