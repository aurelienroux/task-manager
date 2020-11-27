const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to db", error);

    const db = client.db(databaseName);

    // db.collection("users").updateOne(
    //   { _id: new ObjectId("5fc0005e795ea732f29c3569") },
    //   {
    //     $set: { name: 'Etienne' }
    //   }
    // )
    // .then(data => console.log('end', data))
    // .catch(err => console.log(err))

    db.collection('tasks').updateMany(
      { completed: true },
      {
        $set: { completed: false }
      }
    )
      .then(data => console.log(data.modifiedCount))
      .catch(err => console.log(err))

    // db.collection('users').deleteOne({
    //   completed: true
    // })
    //   .then(data => console.log(data.deletedCount))
    //   .catch(err => console.log(err))
  }
);
