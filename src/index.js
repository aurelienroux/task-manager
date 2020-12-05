const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// USERS ROUTES
app.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById({ _id: id })
    if (!user) return res.status(404).send({ error: 'No user found' })

    return res.send(user)
  } catch (err) {
    return res.status(500).send(err)
  }
})

app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates' })

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!user) return res.status(404).send('No user found')

    return res.send(user)
  } catch (err) {
    return res.status(400).send(err)
  }
})

// TASKS ROUTES
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await Task.findById({ _id: id })
    if (!task) return res.status(404).send('No task found')

    return res.send(task)
  } catch (err) {
    return res.status(500).send(err)
  }
})

app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates' })

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!task) return res.status(404).send({ error: 'No task was found' })

    return res.send(task)
  } catch (err) {
    return res.status(400).send(err)
  }
})

app.listen(port, () => console.log(`Server is live on port ${port}`))  // eslint-disable-line
