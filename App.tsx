/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import Router from './src/navigation/Router';
import bcrypt from 'react-native-bcrypt';
import { openDatabase } from 'react-native-sqlite-storage';
import { LogBox } from 'react-native';

const database = require('./src/components/Handlers/database.js');

// create constant object that refers to database
const shopperDB = openDatabase({name: 'Shopper.db'});

// create constant that contains the name of the users tables
const usersTableName = 'users';

let salt = bcrypt.genSaltSync(10);

const App: () => Node = () => {
  try {
    database.createListsTable();
  } catch (error) {
    console.log('Failed to create lists table ' + error);
  }
  try {
    database.createItemsTable();
  } catch (error) {
    console.log('Failed to create items table ' + error);
  }
  try {
    database.createListItemsTable();
  } catch (error) {
    console.log('Failed to create list items table ' + error);
  }
  try {
    database.createUsersTable();
  } catch (error) {
    console.log('Failed to create users table ' + error);
  }
  // try {
  //   let hash = bcrypt.hashSync('EmmaRose1104!', salt);
  //   database.addUser('cekloskys', hash);
  // } catch (error) {
  //   console.log('Failed to add user ' + error);
  // }
  return <Router />;
};
LogBox.ignoreLogs(['Math.random']);
export default App;