require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5fc5147e24b468322a72d9c9', { age: 1 })
//   .then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
//   })
//   .then((result) => {
//     console.log(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

const updateAgeAndCount = async (id, age) => {
  await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return count
}

updateAgeAndCount('5fc5179b6f1ffb32b48bcc8e', 3)
  .then((count) => console.log(count)) // eslint-disable-line
  .catch((err) => console.log(err)) // eslint-disable-line
