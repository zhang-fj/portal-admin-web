
export default {
  data() {
    return {
      datamap: {},
      apimap: {},
      apiparamsmap: {},
      notquerykeys: []
    }
  },
  created() {
    for (const key in this.apimap) {
      if (this.notquerykeys.indexOf(key) < 0) {
        this.toQueryDataMap(key)
      }
    }
  },
  methods: {
    toQueryDataMap(key, params, callback) {
      if (this.apimap[key] instanceof Function) {
        this.apimap[key]({ ...params }).then(result => {
          this.$set(this.datamap, key, result.data || result)
          if (callback instanceof Function) {
            callback(result)
          }
        })
      }
    },
    getSelectNameByValue(key, value, nk, vk) {
      if (this.datamap[key]) {
        const obj = this.datamap[key].find((item) => {
          return item[vk || 'id'] === value
        })
        return obj ? obj[nk] : null
      }
      return null
    }
  }
}
