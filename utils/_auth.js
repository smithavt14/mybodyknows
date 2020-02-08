const getCurrentUser = () => {
  return new Promise(resolve => {
    let user = wx.getStorageSync('user') // (1)
    if (user) { resolve(user) } 
    else {
      wx.BaaS.auth.getCurrentUser().then((user) => {
        wx.setStorageSync('user', user)
        resolve(user)
      }).catch(err => {
        if ( err.code === 604 ) { 
          console.log('用户未登录')
          resolve(undefined)
        }
      })
    }
  })
}

const login = (data) => {
  return new Promise(resolve => {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      wx.setStorageSync('user', user)
      resolve(user)
    }, err => {
      console.log(err)
      resolve(undefined)
    })
  })
}

const logout = () => {
  wx.BaaS.auth.logout()
  wx.setStorageSync('user', undefined)
}

module.exports = {getCurrentUser, login, logout}

/* --- Notes ---

(1) Check to see if the user is in local storage or logged-in through the ifanr backend. If the user exists, then add that user data to the page local data.

*/