import React from "react";
import { StyleSheet, TouchableOpacity, Text , View, ActivityIndicator} from "react-native";
import colors from "../colors/colors";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';


export default function InverseButton({ buttonTitle , iconName , ...rest }) {
  return (
      <View style={ styles.mainContainer }>
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
          { iconName === "cog" ?
              <ActivityIndicator style={styles.iconStyle} color={colors.primary} />
              : null
          }
          { iconName !== "cog" ?
            <FontAwesome style={styles.iconStyle} color={colors.primary} name={iconName} size={18}/>
            : null
          }
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    marginLeft: 0 ,
    marginTop: 0 ,
    width: windowWidth,
    display:"block",
    minWidth: "100%"
  },
  iconStyle : {
    flexBasis:"20%",
    fontSize: 20,
    marginLeft:10,
  },
  iconStyleRotate : {
    flexBasis:"20%",
    fontSize: 20,
    marginLeft:10,
    transform: [{rotateY: '180deg'}]
  },
  buttonContainer: {
    display:'flex',
    flexFlow: 'row',
    flexWrap:'no-wrap',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20 ,
    width: "fit-content",
    fontSize: 16,
    height: "fit-content",
    borderColor: colors.primary,
    borderWidth: 1,
    color: colors.primary,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    textAlign: "center",
    alignSelf:"left"
  },
  buttonText: {
    flexBasis:"80%",
    paddingLeft:10,
    paddingRight:20,
    fontSize: 20,
    color: colors.primary,
    flexWrap:'no-wrap',
    minWidth:"100%",
    textAlign: "center",
  },
});
