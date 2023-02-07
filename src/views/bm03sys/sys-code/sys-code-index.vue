<template>
  <div class="app-container" style="padding-top:15px">
    <sys-code-page @to-edit-detail="toEditDetail" />
    <el-dialog :visible.sync="visible">
      <code-page-editor ref="CodePageEditor" :is-refresh="false" />
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="visible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" size="mini" @click="$refs.CodePageEditor.submitCU()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import SysCodePage from './sys-code-page' // 导入列表界面
import CodePageEditor from './code-page-editor.vue'

export default {
  components: { SysCodePage, CodePageEditor },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    saveLoading() {
      return this.$refs.CodePageEditor && this.$refs.CodePageEditor.submitBtnLoading
    }
  },
  methods: {
    toEditDetail(row) {
      this.visible = true
      this.$nextTick(() => {
        if (row) {
          this.$refs.CodePageEditor.setDefaultQuery('sysCode', row.codeId)
          this.$refs.CodePageEditor.optShow.save = false
          this.$refs.CodePageEditor.addBtnDisabled = false
          this.$refs.CodePageEditor.defaultFormData.sysCode = row.codeId
          this.$refs.CodePageEditor.toQuery()
        }
      })
    }
  }
}

</script>

<style scoped>
</style>
