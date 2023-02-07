<template>
  <div class="app-container" style="padding-top:15px">
    <div class="head-container">
      <label class="el-form-item-label">省</label>
      <el-select v-model="province" clearable filterable placeholder="请选择" class="filter-item" style="width: 250px;" @change="provinceChangeHanlder">
        <el-option
          v-for="item in dict.T_CODE_PROVINCE"
          :key="item.id"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <label class="el-form-item-label">市</label>
      <el-select v-model="city" clearable filterable placeholder="请选择" class="filter-item" style="width: 250px;" @change="cityChangeHanlder">
        <el-option
          v-for="item in datamap['citys']"
          :key="item.id"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
      <label class="el-form-item-label">县</label>
      <el-select v-model="county" clearable filterable placeholder="请选择" class="filter-item" style="width: 250px;">
        <el-option
          v-for="item in datamap['countys']"
          :key="item.id"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </div>
  </div>
</template>

<script>

import { list } from '@/api/bm03sys/code-api' // 导入【查询】

import mixinsDatas from '@/mixins/curd/mixins-select-data' // 导入【获取数据接口】混入

export default {
  // 字典引用
  dicts: ['T_CODE_PROVINCE'],
  mixins: [mixinsDatas],
  data() {
    return {
      apimap: { citys: list, countys: list },
      notquerykeys: ['citys', 'countys'],
      province: '',
      city: '',
      county: ''
    }
  },
  created() {
  },
  methods: {
    provinceChangeHanlder(value) {
      this.toQueryDataMap('citys', { sysCode: 'T_CODE_CITY', likeCode: value || 'no_data' }, (res) => {
        this.city = res.length === 0 ? '' : res[0].code
        this.cityChangeHanlder(this.city)
      })
    },
    cityChangeHanlder(value) {
      this.toQueryDataMap('countys', { sysCode: 'T_CODE_DISTRICT', likeCode: value || 'no_data' }, (res) => {
        this.county = res.length === 0 ? '' : res[0].code
      })
    }
  }
}

</script>

<style scoped>
</style>
