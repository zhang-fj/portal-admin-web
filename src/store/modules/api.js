// 适配 Nginx 反向代理
const baseUrl = process.env.VUE_APP_BASE_API === '/' ? '/api' : process.env.VUE_APP_BASE_API
const api = {
  state: {
    // 文件上传
    fileUploadApi: '/api/sys/attachment/upload',
    fileDownloadApi: '/api/sys/attachment/download',
    // baseUrl，
    baseApi: baseUrl
  }
}

export default api
