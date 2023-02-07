
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: {}
    },
    service: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      api: {
        save: null,
        load: null
      },
      formRefName: 'form',
      $form: {},
      time: 50,
      formData: {},
      loading: false,
      defaultFormData: {},
      idField: 'id'
    }
  },
  watch: {
    data: { // 监听的对象
      deep: true, // 深度监听设置为 true
      immediate: true,
      handler(ov) {
        this.load(ov)
      }
    }
  },
  methods: {
    // 加载数据
    load(data) {
      this.clearValidate()
      if (!this.callLoadBefore(data)) {
        return
      }
      if (this.service && this.getDataId(data)) {
        this.serviceLoad(data)
      } else {
        this.clientLoad(data)
      }
    },
    clearValidate() {
      this.$form = this.$from || this.$refs[this.formRefName]
      if (this.$form) {
        this.$form.clearValidate()
      }
    },
    // 加载服务器数据
    serviceLoad(params) {
      const me = this
      if (me.api.load) {
        return new Promise((resolve, reject) => {
          me.loading = true
          // 请求数据
          me.api.load(me.getLoadParams(params)).then(result => {
            me.clientLoad(result.data)
            setTimeout(() => {
              me.loading = false
            }, me.time)
            resolve(result)
          }).catch(err => {
            me.loading = false
            reject(err)
          })
        })
      }
    },
    // 加载客户端数据
    clientLoad(data) {
      this.formData = { ...this.defaultFormData, ...data }
    },
    // 获取数据主键
    getDataId(data) {
      return data[this.idField]
    },
    // 获取加载数据参数
    getLoadParams(params) {
      const result = {}
      result[this.idField] = this.getDataId(params)
      return result
    },
    // 提交数据
    submitCU() {
      this.$form = this.$from || this.$refs[this.formRefName]
      if (this.$form) {
        this.$form.validate(valid => {
          // 校验表单
          if (!valid) {
            return
          }
          // 执行保存前置函数
          if (this.callSubmitBefore(this.formData, this)) {
            this.doSave(this.formData)
          }
        })
      }
    },
    // 保存或更新数据
    doSave(data) {
      const me = this
      // 请求数据
      this.$emit('submit-before-handler', data, this)
      return new Promise((resolve, reject) => {
        me.api.save(data).then(result => {
          this.$message.success({ message: data.id ? '修改成功！' : '保存成功', duration: 3000, showClose: true })
          me.clientLoad(result)
          // 保存
          if (!this.callSubmitAfter(result, this)) {
            return
          }
          me.$emit('submit-after-handler', result, this)
          resolve(result)
        }).catch(err => {
          me.$emit('submit-error-handler', this)
          me.callSubmitError()
          reject(err)
        })
      })
    },
    callLoadBefore(data) {
      return true
    },
    // 保存前置函数
    callSubmitBefore(data, form) {
      return true
    },
    // 保存前置函数
    callSubmitAfter(data, form) {
      return true
    },
    // 保存失败回调
    callSubmitError() {
    }
  }
}
