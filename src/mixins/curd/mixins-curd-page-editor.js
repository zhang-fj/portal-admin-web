
export default {
  data() {
    return {
      // 请求接口
      api: {
        page: null,
        del: null,
        batchSave: null
      },
      optShow: {
        save: true,
        edit: false
      },
      defaultFormData: {},
      editTableForm: {
        data: []
      },
      tableRefName: 'table',
      // 可编辑表格
      editable: true,
      editDataMap: {}, // 修改数据映射
      editRow: {}, // 当前编辑行
      editCol: {} // 当前编辑列
    }
  },
  methods: {
    getDataId(data) {
      return data[this.idField]
    },
    // 比较编辑数据是否一致
    compareEditData(original, edit) {
      if (original === null && edit === null) {
        return true
      }

      if (typeof original !== 'object' || typeof edit !== 'object') {
        if (original === edit) {
          return true
        } else if (original !== edit) {
          return false
        }
      }
      // 记录当前 compareObject 的返回值，默认是 true
      let status = true
      Object.keys(edit).every(key => {
        if (key === 'edit-table-opt') {
          return
        }
        status = this.compareEditData(original[key], edit[key])
        return status
      })
      return status
    },
    // 设置改变数据单元格状态
    setEditCellClassName(settings) {
      let cellClassName = 'edit-table-col'
      const id = this.getDataId(settings.row)
      if (id) {
        const original = this.editDataMap[id]
        if (settings.column.property) {
          if (original[settings.column.property] !== settings.row[settings.column.property]) {
            cellClassName += ' is-edit'
          }
        }
        if (this.getDataId(this.editRow) === id && settings.column.property === this.editCol.property) {
          if (this.compareEditData(original, settings.row)) {
            this.$delete(original, 'edit-table-opt')
          } else {
            settings.row['edit-table-opt'] = 'edit'
          }
        }
      } else {
        if (settings.column.property) {
          cellClassName += ' is-edit'
        }
      }
      return cellClassName
    },
    getEditData() {
      return {
        edits: this.editTableForm.data.filter(item => {
          return item[this.idField] && item['edit-table-opt'] === 'edit'
        }),
        adds: this.editTableForm.data ? this.editTableForm.data.filter(item => { return !item[this.idField] }) : [],
        dels: Object.keys(this.editDataMap).map((key) => { return this.editDataMap[key] }).filter(item => {
          return item[this.idField] && item['edit-table-opt'] === 'del'
        })
      }
    },
    // 设置当前单元
    handleCurrentRow(scope) {
      if (scope) {
        this.onCellClickHandler(scope.row, scope.column)
        scope.store.table.setCurrentRow(scope.row)
      }
    },
    // 加载表格数据
    reloadTableData(data) {
      this.total = data.total
      this.editTableForm.data = data.data
      if (this.editTableForm.data) {
        this.editTableForm.data.forEach(item => {
          // 缓存【修改数据映射】，用来比较数据是否被修改过
          this.editDataMap[this.getDataId(item)] = JSON.parse(JSON.stringify(item))
        })
      }
    },
    onCellClickHandler(row, column) {
      this.editRow = row
      this.editCol = column
    },
    // 启动新增
    toAdd() {
      this.editTableForm.data.push({ ...this.defaultFormData })
    },
    // 执行删除
    doDelete(data, scope) {
      if (scope) {
        this.doClientDelete(data, scope)
      } else {
        this.doServiceDelete(data)
      }
    },
    doClientDelete(data, scope) {
      this.editTableForm.data.splice(scope.$index, 1)
      if (this.getDataId(data)) {
        this.editDataMap[this.getDataId(data)]['edit-table-opt'] = 'del'
      }
    },
    submitCU() {
      this.$form = this.$from || this.$refs[this.formRefName]
      if (this.$form) {
        this.$form.validate(valid => {
          // 校验表单
          if (!valid) {
            return
          }
          // 执行保存前置函数
          const formData = JSON.parse(JSON.stringify(this.getEditData()))
          if (this.callSubmitBefore(formData, this)) {
            this.doSave(formData)
          }
        })
      }
    },
    // 保存或更新数据
    doSave(data) {
      const me = this
      // 请求数据
      this.submitBeforeHandler(data, this)
      return new Promise((resolve, reject) => {
        me.api.batchSave(data).then(result => {
          // 保存
          if (!this.callSubmitAfter(result, this)) {
            return
          }
          this.submitAfterHandler(result, this)
          me.$emit('delete-after-handler', result, this)
          setTimeout(() => {
          }, me.time)
          resolve(result)
        }).catch(err => {
          this.submitErrorHander(this)
          me.callSubmitError()
          reject(err)
        })
      })
    },
    // 保存前置函数
    callSubmitBefore(data, form) { return true },
    // 保存前置函数
    callSubmitAfter(data, form) { return true },
    // 保存失败回调
    callSubmitError() {}
  }
}
