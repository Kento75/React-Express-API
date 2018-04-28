import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import HelloWorld from './components/helloworld/HelloWorld';
import SearchContainer from './containers/search/SearchContainer';

export default (store) => {

  return (
    <Route path="/" component={App}>
      <Route path="helloworld" component={HelloWorld}/>
      <Route path="search" component={SearchContainer}/>
      <Route path="Create" component={CreateContainer}/>
    </Route>
  );
};

