require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5fc4fda1edf6e129f0337c8a')
//   .then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
//   })
//   .then((result) => {
//     console.log(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount('5fc4fdc5aebe652a20af86ae')
  .then((count) => console.log(count)) // eslint-disable-line
  .catch((err) => console.log(err)) // eslint-disable-line
