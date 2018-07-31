// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import * as counterActions from '../actions/counter';
import type { counterStateType } from '../reducers/counter';

const history = createHashHistory();

const configureStore = (initialState?: counterStateType) => {
  const middleware = [];
  const enhancers = [];

  middleware.push(thunk);

  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  const router = routerMiddleware(history);
  middleware.push(router);

  const actionCreators = {
    ...counterActions,
    ...routerActions
  };

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
};

export { configureStore, history };

