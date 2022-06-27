import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function publishTasks(task, LIMIT, offset) {

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
    }, {sort: {priority: 1}, skip: offset, limit: LIMIT})
  } else {
    return TasksCollection.find({
      $or: [
        {personal: false},
        {userId: this.userId, personal: true}
      ]
    }, {sort: {priority: 1}, skip: offset, limit: LIMIT})
  }

  //   return TasksCollection.find({
  //     $or: [
  //       {personal: false},
  //       {userId: this.userId, personal: true}
  //     ]
  // })

});

// Meteor.publish('tasks-count', function countTasks() {

//   return TasksCollection.find({
//     $or: [
//       {personal: false},
//       {userId: this.userId, personal: true}
//     ]
//   })

// });

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
