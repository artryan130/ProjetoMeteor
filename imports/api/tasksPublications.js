import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function publishTasks(task) {
  return TasksCollection.find({
    $nor: [
      {userId: this.userId},
      {task: {$ne: 'Tarefa do Artryan'}}
    ]
  });
});

// Meteor.publish('task', function findTask(task) {
//   return TasksCollection.find({ task: task });
// })
