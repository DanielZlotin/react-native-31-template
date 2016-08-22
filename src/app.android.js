/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* eslint-disable */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import _ from 'lodash';

import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

const initialState = {
  counter: 0
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {counter: state.counter + 1};
    case 'DECREMENT':
      return {counter: state.counter - 1};
    default:
      return state;
  }
}

const store = createStore(reducer);

import autobind from 'react-autobind';

class template extends Component {

  constructor(props) {
    super(props);
    autobind(this);
  }

  onClick() {
    this.props.dispatch({type: 'INCREMENT'});
  }

  renderButton(i) {
    return (
      <TouchableOpacity key={i} onPress={this.onClick}>
        <View style={{margin: 10}}>
          <Text style={{fontSize: 30}}>{'Click me!'}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{'Welcome to React Native! 0.25.1'}</Text>
        <Text style={styles.instructions}>{this.props.counter}</Text>

        <ScrollView style={{flex: 1}}>
          {_.times(500, (i) => this.renderButton(i))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

const Connected = connect(mapStateToProps)(template);

class Wrapped extends Component {
  render() {
    return (
      <Provider store={store}>
        <Connected/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('template', () => Wrapped);
