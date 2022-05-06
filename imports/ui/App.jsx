import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { LoginForm } from './LoginForm';

export const App = () => {

  const user = useTracker(() => Meteor.user());
  
  return (
    <div className='main'>
      
      {user ? (
        <h1>Oiiii</h1>
      ) : (
      <LoginForm />)
      }
    
    </div>
  )
}
  
  
