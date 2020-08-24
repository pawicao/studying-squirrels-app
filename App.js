import 'react-native-gesture-handler';
import React from 'react';
import authReducer from './src/store/reducers/auth';
import modeReducer from './src/store/reducers/modes';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {MainNavigator} from './src/navigation/MainNavigator';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
  mode: modeReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <MainNavigator />
  </Provider>
);

export default App;

