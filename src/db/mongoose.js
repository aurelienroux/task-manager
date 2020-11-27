const mongoose = require('mongoose')

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('user', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
})

// const nathan = new User({
//   name: 'Nathan',
//   age: 'mike'
// })

// nathan.save()
//   .then(res => console.log(res))
//   .catch(err => console.log('err', err))

const Task = mongoose.model('task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

const task = new Task({
  description: 'shop a bass',
  completed: false
})

task.save()
  .then(res => console.log(res))
  .catch(err => console.log(err))