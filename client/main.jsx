import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { RenderRoutes } from '../imports/ui/routes'

Meteor.startup(() => {
  render(<RenderRoutes/>, document.getElementById('react-target'));
});
