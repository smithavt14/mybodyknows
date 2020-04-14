const _quiz = require('../../utils/_quiz.js')
const _auth = require('../../utils/_auth.js')

Page({
  data: {
    score: 0,
    active: 0
  },

  // ----- Quiz Functions -----
  getQuestions: async function (id) {
    wx.showLoading({ title: '加载中'})
    _quiz.getQuestions(id).then(questions => {
      this.setData({ questions })
      wx.hideLoading()
    })
  },

  calculateScore: function (e) {
    let id = Number.parseInt(e.currentTarget.dataset.id)
    let index = e.currentTarget.dataset.index
    let questions = this.data.questions
    let score = this.data.score
    let active = this.data.active

    if (questions[index]['correct_answer'] === id) score += 1
    
    active += 1

    this.setData({ score, active })

    if ((active + 1) > questions.length) this.navigateToResult(score)
  },

  // ----- Auth Functions -----
  getCurrentUser: async function () {
    _auth.getCurrentUser().then(user => {
      this.setData({ user })
    })
  },

  // ----- Navigation Functions -----
  navigateToResult: function (score) {
    wx.navigateTo({
      url: `/pages/result/result?score=${score}`
    })
  },

  // ----- Lifecycle Functions -----
  onLoad: function () {
    this.getCurrentUser()
    this.getQuestions('5e95bffc13d1201c358aa836');
  }
})