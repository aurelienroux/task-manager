const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) return console.log('Unable to connect to db', error)

  const db = client.db(databaseName)
  
  // db.collection('users').insertOne({
  //   name: "Aure",
  //   age: 39
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('unable to insert user')
  //   }
      
  //   console.log(result.ops)
  // })

  // db.collection('users').insertMany([
  //   { name: 'David', age: 40 },
  //   { name: 'Adrien', age: 7 }
  // ], (error, result) => {
  //     if (error) return console.log('unable to insert multiple users')
      
  //     console.log(result.ops)
  // })

  // db.collection('tasks').insertMany([
  //   { description: 'buy bass', completed: true },
  //   { description: 'tune bass', completed: true },
  //   { description: 'learn songs', completed: false },
  // ], (error, response) => {
  //     if (error) return console.log('Unable to insert tasks')

  //     console.log(response.ops)
  // })
})
