import Vue from 'vue'
import { list as getDictDetail } from '@/api/bm03sys/code-api' // 导入【查询】,【批量保存】和【删除】api

export default class Dict {
  constructor(dict) {
    this.dict = dict
  }

  async init(names, completeCallback) {
    if (names === undefined || name === null) {
      throw new Error('need Dict names')
    }
    const ps = []
    names.forEach(n => {
      Vue.set(this.dict.dict, n, {})
      Vue.set(this.dict.label, n, {})
      Vue.set(this.dict, n, [])
      ps.push(getDictDetail({ sysCode: n }).then(data => {
        this.dict[n].splice(0, 0, ...data.map(item => { return { id: item.code, value: item.code, label: item.name } }))
        data.forEach(d => {
          Vue.set(this.dict.dict[n], d.code, d)
          Vue.set(this.dict.label[n], d.code, d.name)
        })
      }))
    })
    await Promise.all(ps)
    completeCallback()
  }
}
