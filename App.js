import React, { Component } from 'react';
import store from './src/store/index.js';
import Root from './Root';
import { Provider } from 'react-redux';

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

