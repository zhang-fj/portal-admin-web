<template>
  <div class="app-container" style="padding-top:15px">
    <div class="head-container">
      <el-date-picker
        v-model="startCDate"
        style="width:160px"
        class="filter-item"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="开始时间"
      />
      至
      <el-date-picker
        v-model="endCDate"
        style="width:160px"
        class="filter-item"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="结束时间"
      />
      <el-button type="primary" class="filter-item" size="mini" @click="computeWorkday()">确 定</el-button>
      <div v-show="show" style="margin-top:20px">
        <el-tag>总计{{ computeDays }}天</el-tag>
        <el-tag type="success">工作{{ computeWorkdays }}天</el-tag>
        <el-tag type="danger">假期{{ computeHolidays }}天</el-tag>
      </div>
    </div>
  </div>
</template>

<script>

import { computeWorkday } from '@/api/bm03sys/sys-holiday-api'

export default {
  data() {
    return {
      show: false,
      computeDays: 0,
      computeWorkdays: 0,
      computeHolidays: 0,
      startCDate: '',
      endCDate: ''
    }
  },
  created() {
    const date = new Date()
    const year = '' + date.getFullYear()
    const month = this.toPadStart('' + (date.getMonth() + 1))
    this.startCDate = year + '-' + month + '-01'
    this.endCDate = year + '-' + month + '-' + this.toPadStart('' + date.getDate())
  },
  methods: {
    toPadStart(str) {
      return str.padStart(2, '0')
    },
    // 计算工作日
    computeWorkday() {
      computeWorkday({ 'startDate': this.startCDate, 'endDate': this.endCDate }).then(res => {
        this.show = true
        this.computeDays = res.days
        this.computeWorkdays = res.workdays
        this.computeHolidays = res.holidays
      })
    }
  }
}

</script>

<style scoped>
</style>
