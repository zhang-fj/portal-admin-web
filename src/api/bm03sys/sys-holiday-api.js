import request from '@/utils/request'

export function initHoliday(data) {
  return request({
    url: '/bm03sys/holiday/initHoliday',
    method: 'post',
    data
  })
}
export function setHoliday(data) {
  return request({
    url: '/bm03sys/holiday/setHoliday',
    method: 'post',
    data
  })
}

export function getMonthHoliday(data) {
  return request({
    url: '/bm03sys/holiday/getMonthHoliday',
    method: 'post',
    data
  })
}

export function computeWorkday(data) {
  return request({
    url: '/bm03sys/holiday/computeWorkday',
    method: 'post',
    data
  })
}

export default { initHoliday, getMonthHoliday, setHoliday, computeWorkday }
