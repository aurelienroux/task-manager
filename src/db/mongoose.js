const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('user', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) { 
      if (!validator.isEmail(value)) {
        throw new Error('Email format is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Invalid password')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be positive')
      }
    }
  }
})

// const nathan = new User({
//   name: '   Nathan   ',
//   email: '   ADrien@test.ca',
//   password: 'the password is ok'
// })

// nathan.save()
//   .then(res => console.log(res))
//   .catch(err => console.log('err', err))

const Task = mongoose.model('task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const task = new Task({
  description: 'GB bass',
  // completed: true
})

task.save()
  .then(res => console.log(res))
  .catch(err => console.log(err))