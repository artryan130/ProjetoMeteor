import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { LoginForm } from './LoginForm';
import { Fragment } from 'react/cjs/react.production.min';

export const App = () => {

  const user = useTracker(() => Meteor.user());
  
  return (
    <div className='main'>
      
      {user ? (
        <Fragment><h1>Oiiii</h1></Fragment>
      ) : (
      <LoginForm />)
      }
    
    </div>
  )
}
  
  
