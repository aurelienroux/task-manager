require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5fc5147e24b468322a72d9c9', { age: 1 })
  .then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
  })
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    console.log(err)
  })
