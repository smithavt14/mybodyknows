const getQuestions = (id) => {
  return new Promise(resolve => {
    const query = new wx.BaaS.Query()

    query.compare('quiz_id', '=', id)

    const Question = new wx.BaaS.TableObject('question')
    Question.setQuery(query).find().then(res => {
      resolve(res.data.objects)
    }, err => {
      console.log(err)
      resolve(undefined)
    })
  })
}

const getQuizData = (id) => {
  return new Promise(resolve => {
    const Quiz = new wx.BaaS.TableObject('quiz')

    Quiz.get(id).then(res => {
      console.log(res)
      resolve(res.data)
    }, err => {
      console.log(err)
      resolve(undefined)
    })
  })
}

module.exports = { getQuestions, getQuizData }