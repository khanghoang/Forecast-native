/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

require('es6-promise').polyfill();
require('isomorphic-fetch');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

let sinon = require('sinon');
let xhr = sinon.useFakeXMLHttpRequest();

let agent = require('superagent');

class SinonTest extends Component {
  componentDidMount() {

    let request;
    xhr.onCreate = function (xhr) {
      request = xhr;
    };

    agent.get('http://localhost:3000/posts/1')
    .set('Accept', 'application/json')
    .end(function(err, res) {
      debugger;
    });

    request.respond(200, { "Content-Type": "application/json" }, '{ "stuff": "is", "awesome": "in here" }');

    window.sinon = sinon;
    window.agent = agent;
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SinonTest', () => SinonTest);
