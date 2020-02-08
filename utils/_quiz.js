const getQuiz = (id) => {
  return new Promise(resolve => {
    let query = new wx.BaaS.Query()

    query.compare('quiz_id', '=', id)

    let Quiz = new wx.BaaS.TableObject('quiz')
    Quiz.setQuery(query).find().then(res => {
      resolve(res.data.objects)
    }, err => {
      console.log(err)
      resolve(undefined)
    })
  })
}

module.exports = { getQuiz }