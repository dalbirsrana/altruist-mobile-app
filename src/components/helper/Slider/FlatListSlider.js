import React, {Component, createRef} from 'react';
import {Dimensions, FlatList, LayoutAnimation, Platform, StyleSheet, UIManager, View,} from 'react-native';
import Indicator from './Indicator';
import ChildItem from './ChildItem';

export default class FlatListSlider extends Component {

    static defaultProps = {
        data: [],
        imageKey: 'image',
        local: false,
        width: Math.round(Dimensions.get('window').width),
        height: 230,
        separatorWidth: 0,
        loop: true,
        indicator: true,
        indicatorStyle: {},
        indicatorContainerStyle: {position: 'absolute', bottom: 10},
        indicatorActiveColor: '#3498db',
        indicatorInActiveColor: '#bdc3c7',
        indicatorActiveWidth: 6,
        animation: true,
        autoscroll: true,
        timer: 1000,
        onPress: {},
        contentContainerStyle: {position: 'relative'},
        component: <ChildItem/>,
    };
    slider = createRef();
    viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
    };

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            data: this.props.data,
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount() {
        if (this.props.autoscroll) {
            this.startAutoPlay();
        }
    }

    componentWillUnmount() {
        if (this.props.autoscroll) {
            this.stopAutoPlay();
        }
    }

    render() {
        const itemWidth = this.props.width;
        const separatorWidth = this.props.separatorWidth;
        const totalItemWidth = itemWidth + separatorWidth;

        return (
            <View>
                <FlatList
                    ref={this.slider}
                    horizontal
                    pagingEnabled={true}
                    snapToInterval={totalItemWidth}
                    decelerationRate="fast"
                    bounces={false}
                    contentContainerStyle={this.props.contentContainerStyle}
                    data={this.state.data}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => (

                        // console.log( item ),

                        React.cloneElement(this.props.component, {
                            style: {width: this.props.width},
                            item: item,
                            imageKey: this.props.imageKey,
                            onPress: this.changeSliderListIndex,
                            index: this.state.index % this.props.data.length,
                            active: index === this.state.index,
                            local: this.props.local,
                            height: this.props.height,
                        })

                    )


                    }
                    ItemSeparatorComponent={() => (
                        <View style={{width: this.props.separatorWidth}}/>
                    )}
                    keyExtractor={(item, index) => item.toString() + index}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    viewabilityConfig={this.viewabilityConfig}
                    getItemLayout={(data, index) => ({
                        length: totalItemWidth,
                        offset: totalItemWidth * index,
                        index,
                    })}
                    windowSize={1}
                    // initialScrollIndex={0}
                    initialNumToRender={0}
                    maxToRenderPerBatch={1}
                    removeClippedSubviews={true}
                />


                {this.props.indicator && (
                    <Indicator
                        itemCount={this.props.data.length}
                        currentIndex={this.state.index % this.props.data.length}
                        indicatorStyle={this.props.indicatorStyle}
                        indicatorContainerStyle={[
                            styles.indicatorContainerStyle,
                            this.props.indicatorContainerStyle,
                        ]}
                        indicatorActiveColor={this.props.indicatorActiveColor}
                        indicatorInActiveColor={this.props.indicatorInActiveColor}
                        indicatorActiveWidth={this.props.indicatorActiveWidth}
                        style={{...styles.indicator, ...this.props.indicatorStyle}}
                    />
                )}
            </View>
        );
    };

    onViewableItemsChanged = ({viewableItems, changed}) => {
        if (viewableItems.length > 0) {
            let currentIndex = viewableItems[0].index;
            if (
                currentIndex % this.props.data.length === this.props.data.length - 1 &&
                this.props.loop
            ) {
                this.setState({
                    index: currentIndex,
                    data: [...this.state.data, ...this.props.data],
                });
            } else {
                this.setState({index: currentIndex});
            }

            if (this.props.currentIndexCallback) {
                this.props.currentIndexCallback(currentIndex);
            }
        }
    };

    changeSliderListIndex = () => {
        if (this.props.animation) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeIn);
        }
        let newIndex = this.state.index;
        if (newIndex > (this.state.data.length - 1)) {
            newIndex = 0;
        }
        this.setState({index: newIndex + 1});
        // this.slider.current.scrollToIndex({
        //     index: newIndex,
        //     animated: true,
        // });
        //
        // this.slider.current.scrollToItem({
        //     index: newIndex,
        //     animated: true,
        // });

        this.slider.current.scrollToEnd();

    };

    startAutoPlay = () => {
        this.sliderTimer = setInterval(
            this.changeSliderListIndex,
            this.props.timer,
        );
    };

    stopAutoPlay = () => {
        if (this.sliderTimer) {
            clearInterval(this.sliderTimer);
            this.sliderTimer = null;
        }
    };
}

const styles = StyleSheet.create({
    image: {
        height: 230,
        resizeMode: 'stretch',
    },
    indicatorContainerStyle: {
        marginTop: 18,
    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {width: 3, height: 3},
                shadowOpacity: 0.4,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
});