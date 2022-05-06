import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { App } from '../imports/ui/App';
import {renderRoutes} from '../imports/ui/routes'

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('react-target'));
});
