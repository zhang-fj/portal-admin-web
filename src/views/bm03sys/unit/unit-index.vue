<template>
  <div class="app-container" style="padding-top:15px">
    <el-container>
      <el-aside width="300px" style="padding:0px;background:#ffffff">
        <el-tree
          ref="unitTree"
          node-key="id"
          :props="defaultProps"
          :expand-on-click-node="false"
          :default-expanded-keys="['GU0000000000000000']"
          lazy
          :load="loadNode"
          @node-click="handleNodeClick"
        />
      </el-aside>
      <el-main style="padding:0px;margin-left:15px">
        <el-divider content-position="left">上级组织：{{ data.name }}</el-divider>
        <unit-page ref="UnitPage" @submit-after-handler="refreshNode()" @delete-after-handler="refreshNode()" />
      </el-main>
    </el-container>

  </div>
</template>

<script>

import { list } from '@/api/bm03sys/unit-api' // 导入【查询】和【删除】api
import UnitPage from './unit-page' // 导入列表界面

export default {
  components: { UnitPage },
  data() {
    return {
      data: { id: 'GU0000000000000000', name: '组织机构' },
      defaultProps: { children: 'children', label: (data, node) => { return data.name + '(' + data.subUnitCount + ')' }, isLeaf: function(data) { return data.subUnitCount === 0 } },
      loading: false
    }
  },
  mounted() {
    this.$refs.UnitPage.setDefaultQuery('pcode', 'GU0000000000000000')
    this.$refs.UnitPage.defaultFormData.pcode = 'GU0000000000000000'
  },
  methods: {
    handleNodeClick(data, node, tree) {
      this.data = data
      this.$refs.UnitPage.setDefaultQuery('pcode', data.id)
      this.$refs.UnitPage.defaultFormData.pcode = data.id
      this.$refs.UnitPage.toQuery()
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        resolve([{ id: 'GU0000000000000000', name: '组织机构', subUnitCount: 0 }])
      } else {
        list({ pcode: node.data.id }).then((res) => {
          node.data.subUnitCount = res.length
          resolve(res)
        }).catch(() => {})
      }
    },
    refreshNode(id) {
      const node = this.$refs.unitTree.getNode(this.data.id)
      node.loaded = false
      node.expand()
    }
  }
}

</script>

<style scoped>
</style>
