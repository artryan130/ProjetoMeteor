import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import  { LoginForm } from './LoginForm';

export const App = () => {

  const user = useTracker(() => Meteor.user());

  return (
    <div className='main'>
       <h1>Oiiii</h1>
    </div>
  )
}
  
  
