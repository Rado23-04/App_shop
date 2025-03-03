import React from 'react'
import { StyleSheet } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import FavoritesSreen from '../screens/FavoritesSreen'
import OrderHistory from '../screens/OrderHistoryScreen'
import CustomIcon from '../components/CustomIcon'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator >
            <Tab.Screen name='Home' component={HomeScreen}>
                
            </Tab.Screen>
    </Tab.Navigator>
  )
}


const styles = StyleSheet.create({})
export default TabNavigator