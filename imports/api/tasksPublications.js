import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function publishTasks(task) {
  return task ? TasksCollection.find({
    $nor: [
      {userId: {$ne: this.userId  }},
      {task: {$ne: task }}
    ]
  }, {sort: {priority: 1}, skip: 0, limit: 4}) : TasksCollection.find({userId: this.userId});
});

// Meteor.publish('task', function findTask(task) {
//   return TasksCollection.find({ task: task });
// })
