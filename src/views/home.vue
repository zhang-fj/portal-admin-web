<template>
  <div v-loading="!show" element-loading-text="数据加载中..." :style="!show ? 'height: 500px' : 'height: 100%'" class="app-container">
    <div v-if="show">
      <el-card class="box-card">
        <div style="color: #666;font-size: 13px;">
          <svg-icon icon-class="system" style="margin-right: 5px" />
          <span>
            系统：{{ data.sys.os }}
          </span>
          <span>
            IP：{{ data.sys.ip }}
          </span>
          <span>
            项目已不间断运行：{{ data.sys.day }}
          </span>
          <i class="el-icon-refresh" style="margin-left: 40px" @click="init" />
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold;color: #666;font-size: 15px">状态</span>
        </div>
        <div>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" style="margin-bottom: 10px">
            <div class="title">CPU使用率</div>
            <el-tooltip placement="top-end">
              <div slot="content" style="font-size: 12px;">
                <div style="padding: 3px;">
                  {{ data.cpu.name }}
                </div>
                <div style="padding: 3px">
                  {{ data.cpu.package }}
                </div>
                <div style="padding: 3px">
                  {{ data.cpu.core }}
                </div>
                <div style="padding: 3px">
                  {{ data.cpu.logic }}
                </div>
              </div>
              <div class="content">
                <el-progress type="dashboard" :percentage="parseFloat(data.cpu.used)" />
              </div>
            </el-tooltip>
            <div class="footer">{{ data.cpu.coreNumber }} 核心</div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" style="margin-bottom: 10px">
            <div class="title">内存使用率</div>
            <el-tooltip placement="top-end">
              <div slot="content" style="font-size: 12px;">
                <div style="padding: 3px;">
                  总量：{{ data.memory.total }}
                </div>
                <div style="padding: 3px">
                  已使用：{{ data.memory.used }}
                </div>
                <div style="padding: 3px">
                  空闲：{{ data.memory.available }}
                </div>
              </div>
              <div class="content">
                <el-progress type="dashboard" :percentage="parseFloat(data.memory.usageRate)" />
              </div>
            </el-tooltip>
            <div class="footer">{{ data.memory.used }} / {{ data.memory.total }}</div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" style="margin-bottom: 10px">
            <div class="title">交换区使用率</div>
            <el-tooltip placement="top-end">
              <div slot="content" style="font-size: 12px;">
                <div style="padding: 3px;">
                  总量：{{ data.swap.total }}
                </div>
                <div style="padding: 3px">
                  已使用：{{ data.swap.used }}
                </div>
                <div style="padding: 3px">
                  空闲：{{ data.swap.available }}
                </div>
              </div>
              <div class="content">
                <el-progress type="dashboard" :percentage="parseFloat(data.swap.usageRate)" />
              </div>
            </el-tooltip>
            <div class="footer">{{ data.swap.used }} / {{ data.swap.total }}</div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" style="margin-bottom: 10px">
            <div class="title">磁盘使用率</div>
            <div class="content">
              <el-tooltip placement="top-end">
                <div slot="content" style="font-size: 12px;">
                  <div style="padding: 3px">
                    总量：{{ data.disk.total }}
                  </div>
                  <div style="padding: 3px">
                    空闲：{{ data.disk.available }}
                  </div>
                </div>
                <div class="content">
                  <el-progress type="dashboard" :percentage="parseFloat(data.disk.usageRate)" />
                </div>
              </el-tooltip>
            </div>
            <div class="footer">{{ data.disk.used }} / {{ data.disk.total }}</div>
          </el-col>
        </div>
      </el-card>

      <div>
        <el-row :gutter="6">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-bottom: 10px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold;color: #666;font-size: 15px">CPU使用率监控</span>
              </div>
              <div>
                <v-chart ref="cpu_chart" :style="{width:'100%'}" :options="cpuInfo" />
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-bottom: 10px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold;color: #666;font-size: 15px">内存使用率监控</span>
              </div>
              <div>
                <v-chart ref="memory_chart" :style="{width:'100%'}" :options="memoryInfo" />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import { initData } from '@/api/data'
export default {
  name: 'ServerMonitor',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      show: false,
      monitor: null,
      url: 'sys/monitor/query',
      data: {},
      cpuInfo: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 100,
          interval: 20
        },
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 20,
              color: '#7aff00'
            },
            {
              gt: 20,
              lte: 40,
              color: '#f5f903'
            },
            {
              gt: 40,
              lte: 60,
              color: '#FBDB0F'
            },
            {
              gt: 60,
              lte: 80,
              color: '#FC7D02'
            },
            {
              gt: 80,
              lte: 100,
              color: '#FD0100'
            }
          ]
        },
        series: [{
          data: [],
          type: 'line'
        }]
      },
      memoryInfo: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 100,
          interval: 20
        },
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 20,
              color: '#7aff00'
            },
            {
              gt: 20,
              lte: 40,
              color: '#f5f903'
            },
            {
              gt: 40,
              lte: 60,
              color: '#FBDB0F'
            },
            {
              gt: 60,
              lte: 80,
              color: '#FC7D02'
            },
            {
              gt: 80,
              lte: 100,
              color: '#FD0100'
            }
          ]
        },
        series: [{
          data: [],
          type: 'line'
        }]
      }
    }
  },
  created() {
    this.init()
    this.monitor = window.setInterval(() => {
      setTimeout(() => {
        this.init()
      }, 2)
    }, 3500)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeTheChart)
  },
  mounted() {
    window.addEventListener('resize', this.resizeTheChart)
  },
  destroyed() {
    clearInterval(this.monitor)
  },
  methods: {
    resizeTheChart() {
      if (this.$refs.memory_chart) {
        this.$refs.memory_chart.resize()
      }
      if (this.$refs.cpu_chart) {
        this.$refs.cpu_chart.resize()
      }
    },
    init() {
      initData(this.url, {}).then(data => {
        this.data = data
        this.show = true
        if (this.cpuInfo.xAxis.data.length >= 8) {
          this.cpuInfo.xAxis.data.shift()
          this.memoryInfo.xAxis.data.shift()
          this.cpuInfo.series[0].data.shift()
          this.memoryInfo.series[0].data.shift()
        }
        this.cpuInfo.xAxis.data.push(data.time)
        this.memoryInfo.xAxis.data.push(data.time)
        this.cpuInfo.series[0].data.push(parseFloat(data.cpu.used))
        this.memoryInfo.series[0].data.push(parseFloat(data.memory.usageRate))
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .box-card {
    margin-bottom: 5px;
    span {
      margin-right: 28px;
    }
    .el-icon-refresh {
      margin-right: 10px;
      float: right;
      cursor:pointer;
    }
  }
  .cpu, .memory, .swap, .disk  {
    width: 20%;
    float: left;
    padding-bottom: 20px;
    margin-right: 5%;
  }
 .title {
   text-align: center;
   font-size: 15px;
   font-weight: 500;
   color: #999;
   margin-bottom: 16px;
 }
 .footer {
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    color: #999;
    margin-top: -5px;
    margin-bottom: 10px;
  }
  .content {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
