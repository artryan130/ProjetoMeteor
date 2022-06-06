import { Box } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React from 'react'
import { Input } from '@mui/material';
import { useTracker } from 'meteor/react-meteor-data';

export const  ProfileForm = (props) => {

    const user = useTracker(()=> Meteor.user())

    const { dados } = useTracker(() => {
        const noDataAvailable = { dados: []};
        if (!Meteor.user()) {
        return noDataAvailable;
    }
        const dados = Meteor.users.find(user._id).fetch();
        console.log(dados)
        return {dados};
    })

    return (

        <Box>
            {console.log(dados)}
            <Input 
                type='text'
                value={dados.username}
            />
        </Box>

    )

}