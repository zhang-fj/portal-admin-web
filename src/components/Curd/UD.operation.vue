<template>
  <span>
    <slot name="left" />
    <el-button v-if="showEdit" :disabled="disabledEdit" size="mini" :type="btnType||'primary'" icon="el-icon-edit" @click="toEdit">{{ btnType==='text'?editBtnText:'' }}</el-button>
    <el-popover v-model="pop" placement="top" width="180" trigger="manual" @show="onPopoverShow" @hide="onPopoverHide">
      <p>{{ msg }}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="doCancel">取消</el-button>
        <el-button type="primary" size="mini" @click="doDelete">确定</el-button>
      </div>
      <el-button slot="reference" :loading="pop" :disabled="disabledDle" :type="btnType||'danger'" icon="el-icon-delete" size="mini" @click="toDelete">{{ btnType==='text'?delBtnText:'' }}</el-button>
    </el-popover>
    <slot name="right" />
  </span>
</template>
<script>

export default {
  props: {
    scope: {
      type: Object,
      required: false,
      default: null
    },
    showEdit: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      required: true
    },
    btnType: {
      type: String,
      default: null
    },
    editBtnText: {
      type: String,
      default: '编辑'
    },
    delBtnText: {
      type: String,
      default: '删除'
    },
    disabledEdit: {
      type: Boolean,
      default: false
    },
    disabledDle: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '确定删除本条数据吗？'
    }
  },
  data() {
    return {
      pop: false
    }
  },
  methods: {
    toEdit() {
      this.$emit('to-edit-handler', this.data)
    },
    toDelete() {
      this.pop = true
    },
    doCancel() {
      this.pop = false
    },
    doDelete() {
      this.pop = false
      this.$emit('do-delete-handler', this.data, this.scope)
    },
    onPopoverShow() {
      setTimeout(() => {
        document.addEventListener('click', this.handleDocumentClick)
      }, 0)
    },
    onPopoverHide() {
      document.removeEventListener('click', this.handleDocumentClick)
    },
    handleDocumentClick(event) {
      this.pop = false
    }
  }
}
</script>
