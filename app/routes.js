/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
// import HomePage from './containers/HomePage';
// import CounterPage from './containers/CounterPage';

const Demo1 = () => {
  return <div>111</div>
};

const Demo2 = () => {
  return <div>222</div>
};

export default () => {
  <App>
    <Switch>
      {/*<Route path="/counter" component={CounterPage} />*/}
      {/*<Route path="/" component={HomePage} />*/}
      <Route path="/" component={Demo1} />
      <Route path="/demo2" component={Demo2} />
    </Switch>
  </App>
}
