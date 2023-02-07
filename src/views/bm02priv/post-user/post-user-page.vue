<template>
  <div class="head-container">
    <el-row>
      <el-col :span="8" style="padding-right:5px">
        <post-user-user ref="PostUserUser" @row-click="selectRowHandler" />
      </el-col>
      <el-col :span="16" style="padding-left:5px">
        <el-divider content-position="left">用户：{{ userName }} </el-divider>
        <post-user-post ref="PostUserPost" @submit="doAuth" />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { page, batchSave, del, getPostsByUserId } from '@/api/bm02priv/post-user-api' // 导入【查询】和【删除】api
import mixinsCurdPage from '@/mixins/curd/mixins-curd-page' // 导入【列表】混入

import PostUserPost from './post-user-post.vue'
import PostUserUser from './post-user-user.vue'

export default {
  name: 'PostUserPage',
  components: { PostUserPost, PostUserUser },
  mixins: [mixinsCurdPage],
  dicts: [],
  data() {
    return {
      title: '人员岗位',
      api: { page, del },
      userName: '',
      userId: '',
      optShow: {
        edit: false
      }
    }
  },
  methods: {
    doAuth() {
      this.loading = true
      const adds = []
      const dels = []
      const defaultSelecionIds = this.$refs.PostUserPost.defaultSelecions.map(item => { return item.id })
      const selectionIds = this.$refs.PostUserPost.selections.map(item => { return item.id })
      this.$refs.PostUserUser.selections.forEach(user => {
        this.$refs.PostUserPost.data.forEach(post => {
          // 如果默认选中数据中不存在，当前选中数据中存在则为新增分配
          if (defaultSelecionIds.indexOf(post.id) < 0 && selectionIds.indexOf(post.id) > -1) {
            adds.push({ postId: post.id, userId: user.id })
          }
          // 如果默认选中数据中存在，当前选中数据中不存在则为删除分配
          if (selectionIds.indexOf(post.id) < 0 && defaultSelecionIds.indexOf(post.id) > -1) {
            dels.push({ postId: post.id, userId: user.id })
          }
        })
      })

      const data = { adds: adds, dels: dels }

      if (adds.length > 0 || dels.length > 0) {
        this.$refs.PostUserPost.submiting = true
        console.info(data)
        batchSave(data).then(result => {
          this.$refs.PostUserPost.submiting = false
          this.$message.success({ message: '分配成功！' })
          this.selectRowHandler({ userId: this.userId, userName: this.userName })
          // this.toQuery()
        }).catch(() => {
          this.$refs.PostUserPost.submiting = false
        })
      }
    },
    selectRowHandler(row) {
      this.userName = row.userName
      this.userId = row.userId
      this.$refs.PostUserUser.selections[0] = row
      getPostsByUserId({ userId: row.userId }).then(result => {
        this.$refs.PostUserPost.setSelections(result)
      })
    }
  }
}
</script>

<style scoped>

</style>
