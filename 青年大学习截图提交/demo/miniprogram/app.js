App({
  onLaunch() {
    wx.cloud.init({
      traceUser: true,
    })
  },
  globalData: {
    id: null,
    currentPhoto: {}
  }
})