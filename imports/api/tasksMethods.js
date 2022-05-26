import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

Meteor.methods({
    'tasks.insert'(task, taskSubtitle) {
        check(task, String);
        check(taskSubtitle, String);

        if(!this.userId) {
            throw new Meteor.Error('Not Authorized.')
        }

        TasksCollection.insert({
            task,
            taskSubtitle,
            createdAt: new Date,
            userId: this.userId
        })
    },

    'tasks.edit'(task, taskSubtitle, _id) {
        check(task, String);
        check(taskSubtitle, String);

        if(!this.userId) {
            throw new Meteor.Error('Not Authorized.')
        }

        TasksCollection.update(_id, {
            $set: {task: task, taskSubtitle:taskSubtitle}
        })
    },
});