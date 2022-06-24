import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

Meteor.methods({
    'tasks.insert'(task, taskSubtitle,personal) {
        check(task, String);
        check(taskSubtitle, String);
        check(personal, Boolean);

        if(!this.userId) {
            throw new Meteor.Error('Not Authorized.')
        }

        TasksCollection.insert({
            task,
            taskSubtitle,
            createdAt: new Date,
            userId: this.userId,
            personal,
            situation: 'Cadastrada'
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

    'tasks.situation'(taskId, situation) {
        check(taskId, String)
        check(situation, String)

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');    
        }
        
        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

            if (!task) {
                throw new Meteor.Error('Access denied.');
            }
    
            TasksCollection.update(taskId, {
                $set: {
                    situation: situation
                } 
            });
        },

    // 'tasks.setIsChecked'(taskId, isChecked) {
    //     check(taskId, String)
    //     check(isChecked, Boolean);

    //     if (!this.userId) {
    //         throw new Meteor.Error('Not authorized.');
    //     }

    //     const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    //     if (!task) {
    //         throw new Meteor.Error('Access denied.');
    //     }

    //     TasksCollection.update(taskId, {
    //         $set: {
    //             isChecked
    //         } 
    //     });

    // 'user.edit'(userId, username, email, data, sexo, empresa) {

    //     Meteor.users.update(userId, {
    //         $set: {
    //             username,
    //             email,
    //             data,
    //             sexo,
    //             empresa,
    //         }
    //     });        

    // }
});