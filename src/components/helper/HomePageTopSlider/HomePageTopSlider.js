import React from 'react'
import {ScrollView, Text, View} from 'react-native'
import FlatListSlider from "../Slider2/FlatListSlider";
import {windowWidth} from "../../../utils/Dimensions";

let images = [
    {
        image:'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        desc: '1',
        buttonLable : "Looking for help"
    },
    {
        image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
        desc: '2',
        buttonLable : "Want to help"
    },
    {
        image:'https://images.unsplash.com/photo-1465572089651-8fde36c892dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80',
        desc: '3',
        buttonLable : "Donate your books"
    },
    {
        image:'https://images.unsplash.com/photo-1533299346856-b1a85808f2ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80',
        desc: '4',
        buttonLable : "Looking for laptop"
    },
    {
        image:'https://images.unsplash.com/photo-1589011352120-510c9fca6d31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        desc: '5',
        buttonLable : "Looking for help"
    },
] ;

const screenWidth = Math.round(windowWidth);
const HomePageTopSlider = (  ) => (

       <View style={{ height: 250 }}>

           <FlatListSlider
               data={images}
               timer={100}
               imageKey={'image'}
               local={false}
               width={screenWidth}
               separator={0}
               loop={false}
               autoscroll={false}
               currentIndexCallback={index => console.log('Index', index)}
               indicator
               animation
           />

       </View>

)

export default HomePageTopSlider;
