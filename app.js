App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,
     wx.requestPayment)

    wx.BaaS.init('61ad7237bd3a1caa9af3', {autoLogin: true})
  },
})