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
            userId: this.userId,
            userName: this.userName
        })
    },

    'tasks.edit'(task, taskSubtitle, taskId, userId) {
        check(task, String);
        check(taskSubtitle, String);

        if(!this.userId) {
            throw new Meteor.Error('Not Authorized.')
        }

        if(this.userId !== userId){
            throw new Meteor.Error('Not Authorized.')
        }

        TasksCollection.update(taskId, {
            $set: {task: task, taskSubtitle:taskSubtitle}
        })
    },

    'tasks.remove'(taskId) {
        check(taskId, String);
    
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId })
    
        if(!task) {
            throw new Meteor.Error('Access Denied.')
        }

        TasksCollection.remove(taskId);
    },
    'tasks.setIsChecked'(taskId, isChecked) {
        check(taskId, String)
        check(isChecked, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

        if (!task) {
            throw new Meteor.Error('Access denied.');
        }

        TasksCollection.update(taskId, {
            $set: {
                isChecked
            } 
        });
    },
});