import React from 'react'
import {View} from 'react-native'
import FlatListSlider from "../Slider2/FlatListSlider";
import {windowWidth} from "../../../utils/Dimensions";

let images = [
    {
        image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80%27',
        desc: '1',
        buttonLable: "Books help"
    },
    {
        image: 'https://images.unsplash.com/photo-1461280360983-bd93eaa5051b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80%27',
        desc: '2',
        buttonLable: "Get Help"
    },
    {
        image: 'https://images.unsplash.com/photo-1515459961680-58264ee27219?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80%27',
        desc: '3',
        buttonLable: "Give Essentials"
    },
    {
        image: 'https://images.unsplash.com/photo-1600725935160-f67ee4f6084a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80%27',
        desc: '4',
        buttonLable: "Help Shifting"
    },
    {
        image: 'https://images.unsplash.com/photo-1580894736036-7a68513983ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        desc: '5',
        buttonLable: "Academic help"
    },
];

const screenWidth = Math.round(windowWidth);
const HomePageTopSlider = ({navigation}) => (

    <View style={{height: 240}}>

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
            navigation={navigation}
        />

    </View>

)

export default HomePageTopSlider;
