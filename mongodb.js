const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to db", error);

    const db = client.db(databaseName);

    // db.collection("users").findOne(
    //   { _id: new ObjectId("5fc00dedc31cfe3516de0016") },
    //   (err, user) => {
    //     if (err) return console.log("Unable to find user");

    //     console.log(user);
    //   }
    // );

    // db.collection('users').find({ age: 39 }).toArray((err, users) => {
    //   console.log(users)
    // })

    // db.collection('users').find({ age: 39 }).count((err, count) => {
    //   console.log(count)
    // })

    db.collection('tasks').findOne({
      _id: new ObjectId("5fc0066aedaef333f9a542c8"),
    }, (err, task) => {
        console.log(task)
    });

    db.collection('tasks').find({ completed: true }).toArray((err, tasks) => {
      console.log(tasks)
    })
  }
);
