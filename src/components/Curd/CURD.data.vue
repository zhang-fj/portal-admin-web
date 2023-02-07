<template>
  <span>
    <slot :data="data" />
  </span>
</template>
<script>

import request from '@/utils/request'

export default {
  props: {
    // 获取数据url
    url: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: 'post'
    },
    // 自动查询
    autoQuery: {
      type: Boolean,
      default: true
    },
    // 查询参数
    params: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      data: []
    }
  },
  created() {
    if (this.autoQuery) {
      this.toQuery({})
    }
  },
  methods: {
    toQuery(params) {
      // 请求数据
      request({
        url: this.url,
        method: this.method,
        data: { ...this.params, ...params }
      }).then(result => {
        this.data = result.data
      })
    }
  }
}
</script>
