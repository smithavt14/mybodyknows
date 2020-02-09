const _auth = require('../../utils/_auth.js')

Page({
  data: {},

  // ----- Auth Functions -----
  getCurrentUser: async function () {
    _auth.getCurrentUser().then(user => {
      this.setData({ user })
      this.saveUserAvatar(user)
    })
  },

  // ----- Canvas Functionality -----
  drawCanvas: function () {
    wx.showLoading({title: '加载中'})
    let systemInfo = wx.getSystemInfoSync()
    let userAvatar = this.data.avatar
    console.log(userAvatar)

    let poster = {
      x: 0,
      y: 0,
      height: 609,
      width: systemInfo.screenWidth * .9
    }
  
    let banner = {
      x: 0,
      y: 0,
      width: poster.width,
      height: poster.width * .42
    }
  
    let userContainer = {
      x: poster.width * .1,
      y: banner.height + 20,
      height: poster.height * .15,
      width: poster.width * .8,
      centerX: function () { return this.x + (this.width / 2) },
      centerY: function () { return this.y + (this.height / 2) }
    }
  
    let avatar = {
      x: userContainer.centerX() / 1.75,
      y: userContainer.centerY(),
      height: userContainer.height / 2
    }
  
    let name = {
      x: userContainer.centerX() - 10,
      y: avatar.y + 5
    }
  
    let score = {
      x: userContainer.centerX(),
      y: userContainer.y + userContainer.height + 70
    }
  
    let title = {
      x: userContainer.centerX(),
      y: score.y + 60
    }
  
    let message = {
      x: userContainer.centerX(),
      y: title.y + 40
    }
  
    let qrCode = {
      x: userContainer.centerX() - 50,
      y: message.y + 55
    }

    this.setData({ poster })

    // Create the canvas
    let context = wx.createCanvasContext('resultPoster')
    
    // Draw a white rectangle (poster)
    context.setFillStyle('white')
    context.fillRect(poster.x, poster.y, poster.width, poster.height)
    
    // Add the banner image
    context.drawImage('../../assets/images/banner.jpg', banner.x, banner.y, banner.width, banner.height)

    // Add user avatar
    context.save()
    context.beginPath()
    context.arc(avatar.x, avatar.y, avatar.height, 0, Math.PI * 2)
    context.clip()
    context.drawImage(userAvatar, avatar.x - avatar.height, avatar.y - avatar.height, avatar.height * 2, avatar.height * 2)
    context.restore()

    // Add user name
    context.setTextAlign('left')
    context.setFillStyle('#353636')
    context.font = 'normal normal normal 20px cursive'
    context.fillText(this.data.user.nickname, name.x, name.y)

    // Add user score
    context.setTextAlign('center')
    context.font = 'normal normal normal 50px cursive'
    context.fillText(this.data.score + '/10', score.x, score.y)

    // Add user title
    context.setFillStyle('#EEB8B9')
    context.font = 'normal normal normal 40px cursive'
    context.fillText('Sex Expert', title.x, title.y)

    // Add message
    context.setFillStyle('#353636')
    context.font = 'normal normal normal 16px cursive'
    context.fillText('恭喜您！您是一个爱性专家。', message.x, message.y)
    context.fillText('在床上加油！', message.x, message.y + 25)

    // Add QR code
    context.drawImage('../../assets/images/oa-qr.png', qrCode.x, qrCode.y, 100, 100)
    
    // Create canvas
    context.stroke()
    context.draw()
    this.setData({ showPoster: true })
    wx.hideLoading()
  },

  savePoster: function () {
    wx.canvasToTempFilePath({
      canvasId: 'resultPoster',
      success(res) {
        let temp = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: temp,
          success(res) {
            wx.showToast({title: '保存成功'})
          }
        })
      }
    })
  },

  saveUserAvatar: function (user) {
    let avatar = user.avatar
    wx.downloadFile({
      url: user.avatar,
      success: res => {
        let avatar = res.tempFilePath
        this.setData({ avatar })
        this.drawCanvas()
      }
    })
  },

  // ----- Navigation Functions -----

  navigateHome: function () {
    console.log('navigateHome')
    wx.reLaunch({
      url: '/pages/index/index',
      fail: function (err) {console.log(err)}
    })
  },

  // ----- Lifecycle Functions -----
  onLoad: function (options) {
    let score = options.score
    this.setData({ score })

    this.getCurrentUser()
  }
})