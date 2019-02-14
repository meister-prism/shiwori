/** @format */
import {AppRegistry,Platform, PermissionsAndroid,} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import React, { Component } from 'react';

//import App from 'react-native-ble-manager/example/App' //<-- simply point to the example js!


AppRegistry.registerComponent(appName, () => App);



