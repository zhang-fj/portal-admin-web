
export default {
  methods: {
    download(fileid) {
      window.open(this.$store.state.api.fileDownloadApi + '?fileId=' + fileid, '_blank')
    },
    view(fileid) {
      window.open(this.$store.state.api.fileDownloadApi + '?view=1&fileId=' + fileid, '_blank')
    }
  }
}
