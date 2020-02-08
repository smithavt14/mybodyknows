const _auth = require('../../utils/_auth.js')

Page({
  data: {},

  // ----- Auth Functions -----
  userInfoHandler: function (data) {
    _auth.login(data).then(user => {
      this.setData({ user })
      this.navigateToQuiz()
    })
  },

  getCurrentUser: async function () {
    _auth.getCurrentUser().then(user => {
      this.setData({ user })
    })
  },

  // ----- Navigation Functions ----- 
  navigateToQuiz: function () {
    wx.navigateTo({
      url: '/pages/quiz/quiz'
    })
  },
  
  // ----- Lifecycle Functions -----
  onLoad: function () {
    this.getCurrentUser()
  }
})