import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, SPACING } from '../theme/theme';

const CARD_WIDTH = Dimensions.get('window').width * 0.32; 
interface CoffeeCardProps{
    id:string;
    index: number;
    type: string;
    rosted: string;
    imagelink_square: string;
    name:string;
    special_ingredient: string;
    average_rating: number;
    price: any;
    buttonPressHandler: any;
}

const CoffeeCard:React.FC<CoffeeCardProps> = ({id,index,type,rosted,imagelink_square,name,special_ingredient,average_rating,price,buttonPressHandler}) => {
  return (
    <LinearGradient
    start={{x:0,y:0}}
    end={{x:1,y:1 }}
    colors={[COLORS.primaryGreyHex,COLORS.primaryBlackHex]}
    style= {styles.CardLinearGradientContainer}
    >
        <ImageBackground style={styles.CardImageBG} source={imagelink_square}></ImageBackground>
    </LinearGradient>
  )
}


const styles = StyleSheet.create({
    CardLinearGradientContainer:{

    },
    CardImageBG:{
      width:CARD_WIDTH,
      height:CARD_WIDTH,
      borderRadius:BORDERRADIUS.radius_20,
      marginBottom:SPACING.space_15,
      overflow: 'hidden',
    },
})
export default CoffeeCard