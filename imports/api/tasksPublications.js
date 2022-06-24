import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function publishTasks(task) {

  // const todas = {$nor: [{$and: [{personal: false}, {userId: this.userId, personal: true}, {userId: {$ne: this.userId}}]}]}

  //   const todas = {userId: {$ne: this.userId}}
  // return TasksCollection.find(todas);

  // return TasksCollection.find({$nor: [{ personal: false }, { userId: this.userId, personal: true }], $and: {task: task}});

  if(task) {
    return TasksCollection.find({
      $or: [
        {personal: false},
        {userId: this.userId, personal: true}
      ],
      $and: [
        {task: task}
      ]
    }, {sort: {priority: 1}, skip: 0, limit: 4})
  } else {
    return TasksCollection.find({
      $or: [
        {personal: false},
        {userId: this.userId, personal: true}
      ]
    },{sort: {priority: 1}, skip: 0, limit: 4})
  }

  //   return TasksCollection.find({
  //     $or: [
  //       {personal: false},
  //       {userId: this.userId, personal: true}
  //     ]
  // })

});

Meteor.publish('tasks-count', function countTasks() {

  const personal = {personal: true}

  return TasksCollection.find({})

});

    // $nor: [{$and: [{userId: {$ne: this.userId}}, { personal:{$eq: true}}]}]
    // $or: [{personal: false}, {userId: this.userId, personal: true}]

  
  // return task ? TasksCollection.find({
  //   $nor: [
  //     {userId: { $ne: this.userId }},
  //     {task: {$ne: task }}
  //   ]
  // }, {sort: {priority: 1}, skip: 0, limit: 4}) : TasksCollection.find({userId: this.userId});

// Meteor.publish('task', function findTask(task) {
//   return TasksCollection.find({ task: task });
// })
