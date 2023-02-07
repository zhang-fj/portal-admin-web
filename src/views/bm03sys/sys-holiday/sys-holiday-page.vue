<template>
  <div class="app-container" style="padding-top:15px">
    <div class="head-container">
      <div>
        <el-date-picker
          v-model="year"
          style="width:120px"
          class="filter-item"
          type="year"
          value-format="yyyy"
          placeholder="选择年"
          @change="changeYear"
        />
        <el-button type="text" style="font-size:18px" :disabled="month == '01'" class="filter-item" icon="el-icon-arrow-left" @click="minusMonth" />
        <el-select v-model="month" placeholder="请选择" class="filter-item" style="width:120px" @change="changeMonth">
          <el-option
            v-for="item in months"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="text" style="font-size:18px" :disabled="month == '12'" class="filter-item" icon="el-icon-arrow-right" @click="addMonth" />
        <el-button plain class="filter-item" size="mini" @click="toTodayMonth">返回今天</el-button>
        <el-button type="danger" class="filter-item" size="mini" @click="initHolidayDialogVisible = true">初始化假期</el-button>
        <el-button type="danger" class="filter-item" size="mini" @click="openSetHolidayDialog">设置假期</el-button>
        <el-button type="info" class="filter-item" size="mini" @click="setWorkday">设置工作日</el-button>
        <el-button type="warning" class="filter-item" size="mini" @click="clear">清除设置</el-button>
        <el-button type="success" class="filter-item" size="mini" @click="openComputeWorkdayDialog">工作日计算</el-button>
      </div>
      <div style="width:960px">
        <full-calendar
          ref="calendar"
          :config="config"
          locale="fr"
          :events="events"
          @day-click="dayClick"
        />
      </div>
    </div>
    <el-dialog
      title="初始化节假日规则"
      :visible.sync="initHolidayDialogVisible"
      width="305px"
    >

      <el-tag
        effect="plain"
        type="danger"
        size="medium"
      >
        初始化节假日规则,会清除已经设置的数据！
      </el-tag>
      <el-divider />
      <el-date-picker
        v-model="startYear"
        style="width:120px"
        class="filter-item"
        type="year"
        value-format="yyyy"
      />
      至
      <el-date-picker
        v-model="endYear"
        style="width:120px"
        class="filter-item"
        type="year"
        value-format="yyyy"
      />

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="initHolidayDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="initHoliday()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="设置假期"
      :visible.sync="setHolidayDialogVisible"
      width="400px"
    >
      设置{{ startDate === endDate ? startDate : startDate+'至'+endDate }} 为假期
      <!-- <el-select v-model="holidayType" placeholder="请选择" class="filter-item" style="width:80px">
        <el-option
          v-for="item in holidayTypes"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select> -->
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="setHolidayDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="setHoliday()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="工作日计算"
      :visible.sync="computeWorkdayDialogVisible"
      width="400px"
    >
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
      <div v-show="show" style="margin-top:20px">
        <el-tag>总计{{ computeDays }}天</el-tag>
        <el-tag type="success">工作{{ computeWorkdays }}天</el-tag>
        <el-tag type="danger">假期{{ computeHolidays }}天</el-tag>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="computeWorkdayDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="computeWorkday()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { initHoliday, getMonthHoliday, setHoliday, computeWorkday } from '@/api/bm03sys/sys-holiday-api' // 导入【查询】和【删除】api
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'

export default {
  name: 'HolidayPage',
  components: { FullCalendar },
  data() {
    return {
      show: false,
      fullscreenLoading: false,
      initHolidayDialogVisible: false,
      setHolidayDialogVisible: false,
      computeWorkdayDialogVisible: false,
      year: '2022',
      month: '01',
      startYear: '',
      endYear: '',
      startCDate: '',
      endCDate: '',
      startDate: null,
      endDate: null,
      holidayType: '休',
      holidayTypes: ['休', '元旦', '春节', '清明节', '劳动节', '端午节', '中秋节', '国庆节'],
      computeDays: 0,
      computeWorkdays: 0,
      computeHolidays: 0,
      months: [
        { value: '01', label: '1月' },
        { value: '02', label: '2月' },
        { value: '03', label: '3月' },
        { value: '04', label: '4月' },
        { value: '05', label: '5月' },
        { value: '06', label: '6月' },
        { value: '07', label: '7月' },
        { value: '08', label: '8月' },
        { value: '09', label: '9月' },
        { value: '10', label: '10月' },
        { value: '11', label: '11月' },
        { value: '12', label: '12月' }
      ],
      calendarEvents: [],
      events: [],
      config: {
        firstDay: 1,
        locale: 'zh-cn',
        defaultView: 'month',
        height: 'auto',
        header: false,
        editable: false,
        views: {
          month: {
            titleFormat: 'YYYY年MM月DD日',
            eventLimit: 1
          }
        },
        unselectAuto: false,
        select: this.selectDays,
        unselect: this.unselectDays,
        buttonText: {
          today: '今天'
        },
        dayClick: this.dayClick
      }
    }
  },
  mounted() {
    this.toTodayMonth()
    this.startYear = this.year
    this.endYear = this.year

    this.toMonthDateScope()
  },
  methods: {
    toTodayMonth() {
      const date = new Date()
      this.year = '' + date.getFullYear()
      this.month = this.toPadStart('' + (date.getMonth() + 1))
      this.loadMonth()
    },
    toMonthDateScope() {
      const date = new Date(this.year, this.month, 0)
      this.startCDate = this.year + '-' + this.month + '-01'
      this.endCDate = this.year + '-' + this.month + '-' + date.getDate()
    },
    changeMonth() {
      this.loadMonth()
    },
    changeYear() {
      this.loadMonth()
    },
    toPadStart(month) {
      return month.padStart(2, '0')
    },
    minusMonth() {
      const monthNum = parseInt(this.month) - 1
      this.month = this.toPadStart('' + monthNum)
      this.loadMonth()
    },
    addMonth() {
      const monthNum = parseInt(this.month) + 1
      this.month = this.toPadStart('' + monthNum)
      this.loadMonth()
    },
    loadMonth() {
      getMonthHoliday({ 'year': this.year, 'month': this.month }).then(res => {
        this.events = res
        this.$refs.calendar.fireMethod('gotoDate', this.year + '-' + this.month + '-01')
      })
    },
    dayClick(day, jsEvent, view) {
    },
    selectDays(start, end) {
      this.startDate = start.format('YYYY-MM-DD')
      this.endDate = end.subtract(1, 'd').format('YYYY-MM-DD')
    },
    unselectDays() {
      this.startDate = null
      this.endDate = null
    },
    // 初始化假期
    initHoliday() {
      this.$confirm('是否初始化' + this.startYear + '年至' + this.endYear + '年节假日规则?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const load = this.$loading({
          lock: true,
          text: '正在初始化。。。',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        initHoliday({ 'startYear': this.startYear, 'endYear': this.endYear }).then(res => {
          this.initHolidayDialogVisible = false
          load.close()
          this.loadMonth()
        })
      })
    },
    openSetHolidayDialog() {
      if (this.startDate && this.endDate) {
        this.holidayType = '休'
        this.setHolidayDialogVisible = true
      } else {
        this.$message({
          message: '请选择需要设置的日期',
          type: 'warning'
        })
      }
    },
    // 设置假期
    setHoliday() {
      const load = this.$loading({
        lock: true,
        text: '正在设置中。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setHoliday({ 'startDate': this.startDate, 'endDate': this.endDate, 'sort': '0', 'holidayType': this.holidayType }).then(res => {
        this.setHolidayDialogVisible = false
        load.close()
        this.loadMonth()
      })
    },
    // 设置工作日
    setWorkday() {
      if (this.startDate && this.endDate) {
        let title = '是否将【' + this.startDate + '】至【' + this.endDate + '】设置为周末上班'
        if (this.startDate === this.endDate) {
          title = '是否将【' + this.startDate + '】设置为周末上班'
        }
        this.$confirm(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const load = this.$loading({
            lock: true,
            text: '正在设置中。。。',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          setHoliday({ 'startDate': this.startDate, 'endDate': this.endDate, 'sort': '1', 'holidayType': '上班' }).then(res => {
            this.setHolidayDialogVisible = false
            load.close()
            this.loadMonth()
          })
        })
      } else {
        this.$message({
          message: '请选择需要设置的日期',
          type: 'warning'
        })
      }
    },
    // 清除设置
    clear() {
      if (this.startDate && this.endDate) {
        let title = '是否清除【' + this.startDate + '】至【' + this.endDate + '】设置'
        if (this.startDate === this.endDate) {
          title = '是否清除【' + this.startDate + '设置'
        }
        this.$confirm(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const load = this.$loading({
            lock: true,
            text: '正在设置中。。。',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          setHoliday({ 'startDate': this.startDate, 'endDate': this.endDate }).then(res => {
            load.close()
            this.loadMonth()
          })
        })
      } else {
        this.$message({
          message: '请选择需要清除的日期',
          type: 'warning'
        })
      }
    },
    openComputeWorkdayDialog() {
      this.computeWorkdayDialogVisible = true
      this.show = false
      this.toMonthDateScope()
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

.head-container >>> .fc-head .fc-widget-header table .fc-day-header{
  height: 30px;
  vertical-align: middle;
  background-color: #46a6ff;
  color:#FFF;
}

.head-container >>> .fc-row .fc-content-skeleton{
  height: 100%;
  position: absolute;
  padding-bottom: 0px;
}

.head-container >>> .fc-row .fc-content-skeleton table{
  height: 100%;
}

.head-container >>> .fc-row .fc-content-skeleton table .fc-event-container{
  padding: 5px;
}

.head-container >>> .fc-row .fc-content-skeleton table .fc-content{
  text-align: center;
  cursor: auto;
}

.head-container >>> .fc-row .fc-content-skeleton table .fc-event{
  position:absolute;
  bottom: 10px;
  border: 0px;
}

</style>
