<!--搜索与重置-->
<template>
  <div v-show="searchToggle">
    <slot name="left" />
    <el-button class="filter-item" :loading="loading" size="mini" type="success" icon="el-icon-search" @click="toQuery()">搜索</el-button>
    <el-button class="filter-item" :loading="loading" size="mini" type="warning" icon="el-icon-refresh-left" @click="resetQuery()">重置</el-button>
    <slot name="right" />
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    searchToggle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toQuery() {
      this.$emit('to-query-handler')
    },
    resetQuery() {
      this.pop = false
      this.$emit('reset-query-handler')
    }
  }
}
</script>
