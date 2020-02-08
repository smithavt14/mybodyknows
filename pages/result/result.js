const _auth = require('../../utils/_auth.js')

Page({
  data: {},

  // ----- Auth Functions -----
  getCurrentUser: async function () {
    _auth.getCurrentUser().then(user => {
      this.setData({ user })
    })
  },

  // ----- Canvas Functionality -----
  createCanvas: function () {
    let context = wx.createCanvasContext('first')
    context.stroke()
    context.draw()
  },

  create2DCanvas: function () {
    const query = wx.createSelectorQuery()
    query.select('#first')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        const img = canvas.createImage()
        ctx.scale(dpr, dpr)
      })
  },

  saveCanvas: function () {
    this.create2DCanvas()
    wx.canvasToTempFilePath({
      canvasId: 'first',
      success(res) {
        let temp = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: temp,
          success(res) { console.log(res) }
        })
      }
    })
  },

  // ----- Lifecycle Functions -----
  onReady: function () {
    // this.create2DCanvas()
  },
  
  onLoad: function (options) {
    this.getCurrentUser()
    
    let score = options.score
    this.setData({ score })
  }
})