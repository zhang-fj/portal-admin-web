
export default {
  props: {
    isRefresh: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 请求接口
      api: {
        page: null,
        del: null
      },
      // 主页操作栏显示哪些按钮
      optShow: {
        add: true,
        edit: true,
        del: true,
        download: true,
        reset: true
      },
      // 绑定表格对象
      tableRefName: 'table',
      $table: null,
      // 绑定表单对象
      formRefName: 'form',
      $form: null,
      // 默认表单数据
      defaultFormData: {},
      // 表单数据
      formData: {},
      // 主键字段
      idField: 'id',
      // 表格数据
      data: [],
      // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
      sort: 'id,desc',
      // 页码
      page: 0,
      // 每页数据条数
      size: 10,
      // 总数据条数
      total: 0,
      // 查询数据的参数
      params: {},
      // 待查询的对象
      query: {},
      // 默认查询条件
      defaultQuery: {},
      // 等待时间
      time: 50,
      // 选择项
      selections: [],
      // 默认选择
      defaultSelecions: [],
      // 是否显示查询条件
      searchToggle: true,
      // 保存按钮
      submitBtnLoading: false,
      // 导出的 Loading
      downloadLoading: false,
      // 表格 Loading 属性
      loading: false,
      // 删除 Loading 属性
      delAllLoading: false,
      // 弹窗属性
      dialog: false,
      // 标题
      title: '',
      addBtnDisabled: false
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.$table = this.$table || this.$refs[this.tableRefName]
      this.$form = this.$form || this.$refs[this.formRefName]
      if (this.isRefresh) {
        this.toQuery()
      }
    })
  },
  computed: {
    optBtnDisabled() {
      const datas = JSON.parse(JSON.stringify(this.selections))
      return {
        save: this.saveBtnDisabled,
        add: this.addBtnDisabled,
        edit: this.editBtnDisabled(datas),
        del: this.delBtnDisabled(datas)
      }
    }
  },
  methods: {
    getDataId(data) {
      return data[this.idField]
    },
    // 刷新方法
    refresh() {
      const me = this
      if (me.api.page) {
        return new Promise((resolve, reject) => {
          me.loading = true
          // 请求数据
          me.api.page(this.getQueryParams()).then(data => {
            me.reloadTableData(data)
            setTimeout(() => {
              me.loading = false
            }, me.time)
            this.$emit('refresh-after-handler', data, this)
            resolve(data)
          }).catch(err => {
            me.loading = false
            reject(err)
          })
        })
      }
    },
    // 查询方法
    toQuery() {
      this.page = 1
      this.refresh()
    },
    // 重置查询
    resetQuery() {
      const defaultQuery = JSON.parse(JSON.stringify(this.defaultQuery))
      Object.keys(this.query).forEach(key => {
        this.query[key] = defaultQuery[key]
      })
      this.params = {}
      this.toQuery()
    },
    // 设置默认查询条件
    setDefaultQuery(key, value) {
      this.defaultQuery[key] = value
      this.$set(this.query, key, value)
    },
    // 获取参数
    getQueryParams: function() {
      return {
        page: this.page - 1,
        size: this.size,
        sort: this.sort,
        ...this.defaultQuery,
        ...this.query,
        ...this.params
      }
    },
    // 加载表格数据
    reloadTableData(data) {
      this.total = data.total
      this.data = data.data
      this.$nextTick(() => {
        this.refreshSelections()
      })
    },
    // 启动新增
    toAdd() {
      this.toForm({ ...this.defaultFormData })
    },
    // 启动修改
    toEdit(data) {
      let params = data
      if (!params) {
        if (this.selections && this.selections.length > 0) {
          params = this.selections[0]
        } else {
          return this.$message({ showClose: true, message: '请选择一条数据', type: 'warning' })
        }
      }
      this.toForm(params)
    },
    // 打开业务表单
    toForm(formData) {
      this.formData = JSON.parse(JSON.stringify(formData))
      this.dialog = true
    },
    cancelCU() {
      this.dialog = false
    },
    // 启动删除
    toDelete(msg) {
      this.$confirm(msg || `确认删除选中的${this.selections.length}条数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delAllLoading = true
        this.doDelete(this.selections)
      }).catch(() => {
      })
    },
    // 执行删除
    doDelete(data, scope) {
      this.doServiceDelete(data)
    },
    doServiceDelete(data) {
      let delAll = false
      const ids = []
      if (data instanceof Array) {
        delAll = true
        data.forEach(val => {
          ids.push(this.getDataId(val))
        })
      } else {
        ids.push(this.getDataId(data))
      }
      return this.api.del(ids).then(() => {
        if (delAll) {
          this.delAllLoading = false
        }
        this.$message.success({ message: '删除成功！', duration: 3000, showClose: true })
        this.$emit('submit-after-handler', this)
        this.dleChangePage(1)
        this.refresh()
      }).catch(() => {
        if (delAll) {
          this.delAllLoading = false
        }
      })
    },
    // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
    dleChangePage(size) {
      if (this.data.length === size && this.page !== 1) {
        this.page -= 1
      }
    },
    // 改变当前页
    pageChangeHandler(page) {
      this.page = page
      this.refresh()
    },
    // 改变页面数量
    sizeChangeHandler(size) {
      this.size = size
      this.page = 1
      this.refresh()
    },
    currentChangeHandler(row) {
      this.$emit('current-change', row)
    },
    submitCU() {
      this.$nextTick(() => {
        this.$form = this.$refs[this.formRefName]
        if (this.$form) {
          console.info(this.$form)
          this.$form.submitCU()
        }
      })
    },
    submitErrorHander(form) {
      this.submitBtnLoading = false
    },
    submitBeforeHandler(data, form) {
      this.submitBtnLoading = true
      return true
    },
    submitAfterHandler(result, form) {
      this.$emit('submit-after-handler', result, form)
      this.submitBtnLoading = false
      this.dialog = false
      this.toQuery()
    },
    // 选择改变
    selectionChangeHandler(selections) {
      this.selections = selections
    },
    // 单选头部选择事件
    singleSelectionAllHandler(selections) {
      this.$table.clearSelection()
    },
    // 单选事件
    singleSelectionChangeHandler(selections) {
      if (selections.length > 1) {
        this.$table.clearSelection()
        this.$table.toggleRowSelection(selections.pop())
      } else {
        this.selections = [selections.pop()]
      }
      this.$emit('single-selection-change', selections)
    },
    setSelections(selections) {
      this.defaultSelecions = selections
      this.refreshSelections()
    },
    refreshSelections() {
      if (this.$table) {
        this.selections = this.defaultSelecions
        const ids = this.selections.map(item => { return item[this.idField] })
        this.data.forEach(item => {
          this.$table.toggleRowSelection(item, ids.indexOf(item[this.idField]) >= 0)
        })
      }
    },
    rowClick(row) {
      this.$table.toggleRowSelection(row)
    },
    editBtnDisabled(datas) {
      return !datas || datas.length !== 1
    },
    delBtnDisabled(datas) {
      return !datas || datas.length < 1
    }
  }
}
