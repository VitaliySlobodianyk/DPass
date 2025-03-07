/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
   Image,
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { cardNames } from '../services/CardNames'
import Icon from 'react-native-vector-icons/Entypo';

const Card = ({ type, limit, quantity, price, onDelete, displayDelete = true }) => {

 const  checkDisplayDelete = () => displayDelete ?
      (<Icon.Button
         name="circle-with-cross"
         backgroundColor="transparent"
         size={30}

         onPress={onDelete}
      />)
      : null;



   return (
      <View style={styles.card}>

         <View style={{
            position: 'absolute',
            zIndex: 100,
            top: -5,
            right: -15

         }}>
            {
               checkDisplayDelete()
            }
         </View>

         <Text style={styles.font}>
            Type: {cardNames[type]}
         </Text>
         <Text>
            Limit:  {limit}
         </Text>
         <Text>
            Quantity:  {quantity} Price:  {price} UAH</Text>
         <Text style={{
            position: 'relative',
         }}>
            Total: {quantity * price} UAH
  </Text>



      </View>
   );

};

const styles = StyleSheet.create({
   card: {
      backgroundColor: '#9E9E9E',
      display: 'flex',
      justifyContent: "center",
      alignItems: 'center',
      color: "#FFFFFF",

      position: 'relative',
      borderBottomWidth: 2,
      borderColor: "#BDBDBD",
      paddingTop: 10,
      paddingBottom: 5,
      marginBottom: 10
      
   },
   font: {
      color: "#FFFFFF",
      fontSize: RFValue(20),
      textAlign: "center"
   }
});

export default Card;
