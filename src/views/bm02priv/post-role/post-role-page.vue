<template>
  <div class="head-container">
    <el-row>
      <el-col :span="8" style="padding-right:5px">
        <post-role-post ref="PostRolePost" @row-click="selectRowHandler" />
      </el-col>
      <el-col :span="16" style="padding-left:5px">
        <el-divider content-position="left">岗位：{{ postName }} </el-divider>
        <post-role-role ref="PostRoleRole" @submit="doAuth" />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { page, batchSave, del, getRolesByPostId } from '@/api/bm02priv/post-role-api' // 导入【查询】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入

import PostRolePost from './post-role-post.vue'
import PostRoleRole from './post-role-role.vue'

export default {
  name: 'PostRolePage',
  components: { PostRolePost, PostRoleRole },
  mixins: [mixinsCurdPage],
  dicts: [],
  data() {
    return {
      title: '岗位角色',
      optShow: {
        edit: false
      },
      postName: '',
      postId: '',
      api: { page, del }
    }
  },
  methods: {
    doAuth() {
      this.loading = true
      const adds = []
      const dels = []
      const defaultSelecionIds = this.$refs.PostRoleRole.defaultSelecions.map(item => { return item.id })
      const selectionIds = this.$refs.PostRoleRole.selections.map(item => { return item.id })
      this.$refs.PostRolePost.selections.forEach(post => {
        this.$refs.PostRoleRole.data.forEach(role => {
          // 如果默认选中数据中不存在，当前选中数据中存在则为新增分配
          if (defaultSelecionIds.indexOf(role.id) < 0 && selectionIds.indexOf(role.id) > -1) {
            adds.push({ postId: post.id, roleId: role.id })
          }
          // 如果默认选中数据中存在，当前选中数据中不存在则为删除分配
          if (selectionIds.indexOf(role.id) < 0 && defaultSelecionIds.indexOf(role.id) > -1) {
            dels.push({ postId: post.id, roleId: role.id })
          }
        })
      })

      const data = { adds: adds, dels: dels }

      if (adds.length > 0 || dels.length > 0) {
        this.$refs.PostRoleRole.submiting = true
        batchSave(data).then(result => {
          this.$refs.PostRoleRole.submiting = false
          this.$message.success({ message: '分配成功！' })
          this.selectRowHandler({ postId: this.postId, postName: this.postName })
        }).catch(() => {
          this.$refs.PostRoleRole.submiting = false
        })
      }
    },
    singleSelectionChangeHandler() {
      this.$refs.PostRoleRole.setSelections([])
    },
    selectRowHandler(row) {
      this.postName = row.postName
      this.postId = row.postId
      this.$refs.PostRolePost.selections[0] = row
      getRolesByPostId({ postId: row.postId }).then(result => {
        this.$refs.PostRoleRole.setSelections(result)
      })
    }
  }
}
</script>

<style scoped>

</style>
