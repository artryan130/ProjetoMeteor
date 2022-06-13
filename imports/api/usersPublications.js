import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function publishUsers(userId) {

    const selector = userId;

    const options = {
        fields: {
            username: 1,
            email: 1,
            data: 1,
            sexo: 1,
            empresa: 1,
            foto: 1,
        }
    }

    return Meteor.users.find({_id: selector}, options)
    
});