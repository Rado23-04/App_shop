import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcon from '../components/CustomIcon'

const getCategoriesFromData =(data:any)=>{
  let temp:any = {};
  for (let i = 0; i < data.length; i++) {
      if(temp[data[i].name]== undefined){
        temp[data[i].name] =1;
      }else{
        temp[data[i].name]++;
      }
  }
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
}

const getCoffeeList = (category:string,data:any) =>{
    if(category=="All"){
      return data;
    }else{
      let coffeeList = data.filter((item:any)=>item.name==category);
      return coffeeList;
    }
}

const HomeScreen = () => {
    const CoffeeList = useStore((state:any)=>state.CoffeeList);
    const BeansList = useStore((state:any)=>state.BeansList);
    const [categories, setCategories]= useState(
      getCategoriesFromData(CoffeeList)
    );
    const [searchText, setSearchText]= useState('');
    const [categoryIndex, setCategoryIndex]= useState({
      index:0,
      category: categories[0],
    });
    const [sortedCoffee,setSortedCoffee] = useState(getCoffeeList(categoryIndex.category,CoffeeList));
    
    const tabBarHeight =useBottomTabBarHeight();  

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewFlex}>
              {/**App Header */}
              <HeaderBar/>

              <Text style={styles.ScreenTitle}>Find the best{'\n'} coffee for you</Text>

              {/**Search Input */}
              <View style={styles.InputContainerComponent}>
                  <TouchableOpacity onPress={()=>{}}>
                        <CustomIcon name='search' 
                        style={styles.InputIcon}
                        color={searchText.length >0 ? COLORS.primaryOrangeHex:COLORS.primaryGreyHex}
                        size={FONTSIZE.size_18}/>
                  </TouchableOpacity>
                  <TextInput placeholder='Find your coffee...' 
                  value={searchText} 
                  placeholderTextColor={COLORS.primaryLightGreyHex}
                  style={styles.TextInputContainer}
                  onChangeText={text=> setSearchText(text)}/>
              </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  screenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryBlackHex
  },
  ScrollViewFlex:{
    flexGrow:1,
  },
  ScreenTitle:{
    fontSize:FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color:COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  TextInputContainer:{
    height:SPACING.space_20 * 3,
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_14,
    color:COLORS.primaryWhiteHex, 
  },
  InputIcon:{
    marginHorizontal:SPACING.space_20,
  },
  InputContainerComponent:{
    flexDirection:'row',
    margin:SPACING.space_30,
    borderRadius:BORDERRADIUS.radius_20,
    backgroundColor:COLORS.primaryDarkGreyHex,
    alignItems:'center'
  }
})
export default HomeScreen