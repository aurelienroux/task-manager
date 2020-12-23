const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/task')

const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })
  try {
    await task.save()
    res.status(201).send(task)
  } catch (err) {
    res.status(400).send(err)
  }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=10
router.get('/tasks', auth, async (req, res) => {
  const match = {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  try {
    // const tasks = await Task.find({ owner: req.user._id })
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit, 10),
          skip: parseInt(req.query.skip, 10)
        }
      })
      .execPopulate()
    res.send(req.user.tasks)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params
  try {
    const task = await Task.findOne({ _id: id, owner: req.user._id })
    if (!task) return res.status(404).send()
    res.send(task)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates' })

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
    if (!task) return res.status(404).send({ error: 'No task was found' })

    updates.forEach((update) => {
      task[update] = req.body[update]
    })
    await task.save()
    res.send(task)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!task) return res.status(404).send({ error: 'No task found' })
    res.send(task)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
