const _quiz = require('../../utils/_quiz.js')
const _auth = require('../../utils/_auth.js')

Page({
  data: {
    score: 0,
    active: 0
  },

  // ----- Quiz Functions -----
  getQuiz: async function (id) {
    _quiz.getQuiz(id).then(questions => {
      this.setData({ questions })
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
    this.getQuiz(1)
  }
})