import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';

interface Props {
    title:string;
    onPress:() => void;
    style?:StyleProp<ViewStyle>;
}

export const BlackButton = ({title,onPress,style = {}}:Props) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={{
            ...style as any,
            ...styles.blackButton,
        }}
    >
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    blackButton:{
      height:45,
      width:200,
      backgroundColor:'#000',
      borderRadius:50,
      justifyContent: 'center',
      alignItems:'center',
      shadowColor:'#000',
      shadowOffset:{
        width:0,
        height:3,
      },
      shadowOpacity:0.27,
      elevation:6,
    },
    buttonText:{
      color:'#fff',
      fontSize:18,
    },
});
