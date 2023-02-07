<template>
  <div class="app-container" style="padding-top:15px">
    <el-row>
      <el-col :span="14">
        <role-page @current-change="currentChangeHandler" />
      </el-col>
      <el-col :span="10" style="padding:0px 10px">
        <el-divider content-position="left">【{{ data.roleName }}】功能分配</el-divider>
        <div class="crud-opts">
          <span class="crud-opts-right">
            <el-button size="mini" type="primary" :disabled="!data.id" icon="el-icon-check" @click="submitRoleFunc">提交</el-button>
          </span>
        </div>
        <el-tree
          ref="funcTree"
          default-expand-all
          :data="funcTreeDatas"
          node-key="id"
          show-checkbox
          :props="defaultProps"
          :expand-on-click-node="false"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { funcTree } from '@/api/bm02priv/func-api' // 导入【保存】和【加载】数据服务接口
import { auth, getAuthFuncIds } from '@/api/bm02priv/role-api' // 导入【角色功能授权】api
import RolePage from './role-page' // 导入列表界面

export default {
  components: { RolePage },
  data() {
    return {
      data: {},
      funcTreeDatas: [],
      defaultProps: { children: 'children', disabled: (data, node) => { return (!this.data.roleId) }, label: (data, node) => { return data.funcName }, isLeaf: function(data) { return data.subFuncCount === 0 } }
    }
  },
  created() {
    this.loadTreeData()
  },
  methods: {
    currentChangeHandler(row) {
      this.data = row
      this.setAuthFuncIds(this.data.roleId)
    },
    // 设置角色已授权菜单
    setAuthFuncIds(roleId) {
      getAuthFuncIds({ roleId: roleId }).then(reslut => {
        this.$refs.funcTree.setCheckedKeys(reslut)
      })
    },
    submitRoleFunc() {
      auth({ roleId: this.data.roleId, funcIds: this.$refs.funcTree.getCheckedKeys().concat(this.$refs.funcTree.getHalfCheckedKeys()) }).then(result => {
        this.$message.success({ message: '授权成功！' })
      })
    },
    loadTreeData() {
      funcTree({}).then((result) => {
        this.funcTreeDatas = result
      })
    }
  }
}

</script>

<style scoped>
</style>
