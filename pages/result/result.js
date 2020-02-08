const _auth = require('../../utils/_auth.js')

Page({
  data: {},

  // ----- Auth Functions -----
  getCurrentUser: async function () {
    _auth.getCurrentUser().then(user => {
      this.setData({ user })
    })
  },

  // ----- Lifecycle Functions -----
  onLoad: function (options) {
    this.getCurrentUser()
    
    let score = options.score
    this.setData({ score })
  }
})