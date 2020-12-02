require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5fc4fda1edf6e129f0337c8a')
  .then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
  })
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    console.log(err)
  })
