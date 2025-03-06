import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcon from '../components/CustomIcon'
import CoffeeCard from '../components/CoffeeCard'


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
      index:1,
      category: categories[1],
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

                {/**Category Scroller */}
                <ScrollView 
                horizontal
                contentContainerStyle={styles.CategoryScrollViewStyle}
                showsHorizontalScrollIndicator={false}
                >
                  {categories.map((data,index)=>(
                  <View
                      key={index.toString()}
                      style={styles.CategoryScrollViewContainer}
                  >
                    <TouchableOpacity 
                      onPress={()=>{
                        setCategoryIndex({index:index,category:categories[index]});
                        setSortedCoffee([...getCoffeeList(categories[index],CoffeeList)])
                      }} 
                      style={styles.CategoryScrollViewItem}>
                          <Text style={[styles.CategoryText,
                          categoryIndex.index==index ? {color:COLORS.primaryOrangeHex}:{}
                          ]}
                            >
                        {data}</Text>
                      {categoryIndex.index==index?
                        (
                          <View style={styles.ActiveCategory}/>
                        ) : (
                            <></>
                          )}
                    </TouchableOpacity>
                  </View>
                ))}
                </ScrollView>

                {/** Coffee Flatlist*/}
                <FlatList 
                keyExtractor={item=>item.id}
                renderItem={({item})=>{
                  return <TouchableOpacity>
                              <CoffeeCard
                              id={item.id} 
                              index={item.index} 
                              type={item.type} 
                              rosted={item.rosted}
                              imagelink_square={item.imagelink_square} 
                              name={item.name} 
                              special_ingredient={item.special_ingredient}
                              average_rating={item.average_rating}
                              price={item.price} 
                              buttonPressHandler={()=>{
                                
                              }}/>
                         </TouchableOpacity>
                }}  
                contentContainerStyle= {styles.FlatListContainer}
                data={sortedCoffee}
                showsHorizontalScrollIndicator = {false}
                horizontal/>

                {/** Beans Flatlist*/}
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
    flex:1,
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
  },
  CategoryScrollViewStyle:{
    paddingHorizontal:SPACING.space_20,
    marginBottom:SPACING.space_20,  
  },
  ActiveCategory:{
    height:SPACING.space_10,
    width:SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor:COLORS.primaryOrangeHex,
  },
  CategoryText:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_16,
    color:COLORS.primaryLightGreyHex,
    marginBottom:SPACING.space_4, 
  },
  CategoryScrollViewContainer:{
    paddingHorizontal:SPACING.space_15,
  },
  CategoryScrollViewItem:{
    alignItems:'center'
  },
  FlatListContainer:{
    gap:SPACING.space_20,
    paddingVertical:SPACING.space_20,
    paddingHorizontal:SPACING.space_30,
  }
})
export default HomeScreen