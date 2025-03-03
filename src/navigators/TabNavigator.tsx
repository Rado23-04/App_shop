import React from 'react'
import { StyleSheet } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import FavoritesSreen from '../screens/FavoritesSreen'
import OrderHistory from '../screens/OrderHistoryScreen'
import CustomIcon from '../components/CustomIcon'
import { COLORS } from '../theme/theme'
import { BlurView } from '@react-native-community/blur'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        tabBarHideOnKeyboard: true,
            tabBarShowLabel:false,
            tabBarStyle: styles.tabBarStyle,
            tabBarBackground:()=>(
                <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles}/>
            ), 
        headerShown:false}}>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon:({focused,color,size})=>(
                    <CustomIcon name='home' size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex} />
                )
            }}></Tab.Screen>
            <Tab.Screen name='Cart' component={CartScreen} options={{
                tabBarIcon:({focused,color,size})=>(
                    <CustomIcon name='Cart' size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex} />
                )
            }}></Tab.Screen>
            <Tab.Screen name='Favorite' component={FavoritesSreen} options={{
                tabBarIcon:({focused,color,size})=>(
                    <CustomIcon name='like' size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex} />
                )
            }}></Tab.Screen>
            <Tab.Screen name='History' component={OrderHistory} options={{
                tabBarIcon:({focused,color,size})=>(
                    <CustomIcon name='bell' size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex} />
                )
            }}></Tab.Screen>
    </Tab.Navigator>
  )
}


const styles = StyleSheet.create({
    tabBarStyle:{
        height:45,
        position:'absolute',
        backgroundColor:COLORS.primaryBlackRGBA,
        borderTopWidth:0,
        elevation:0,
        borderTopColor:'transparent',
    },
    BlurViewStyles:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
    }
})
export default TabNavigator