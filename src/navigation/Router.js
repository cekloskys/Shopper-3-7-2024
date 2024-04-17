import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import TabNavigator from './TabNavigator';
import AddListScreen from '../screens/AddList';
import ExistingListScreen from '../screens/ExistingList';
import AddItemScreen from '../screens/AddItem';
import AddListItemScreen from '../screens/AddListItem';
import ViewListItemScreen from '../screens/ViewListItems';
import ExistingItemScreen from '../screens/ExistingItem';

const Stack = createStackNavigator();

const Router = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'Start Shopping!'} component={TabNavigator}/>
        <Stack.Screen name={'Add List'} component={AddListScreen}/>
        <Stack.Screen name={'Existing List'} component={ExistingListScreen}/>
        <Stack.Screen name={'Add Item'} component={AddItemScreen}/>
        <Stack.Screen name={'Add List Item'} component={AddListItemScreen}/>
        <Stack.Screen name={'View List Items'} component={ViewListItemScreen}/>
        <Stack.Screen name={'Existing Item'} component={ExistingItemScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;