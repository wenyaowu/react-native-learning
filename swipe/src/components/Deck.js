import React, { Component } from 'react';
import { 
    View,
    Animated, 
    PanResponder,
    Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH / 3;
const SWIPE_OUT_DURATION = 250;
class Deck extends Component {
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {},
    }
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true, //User tab on the screen
            onPanResponderMove: (event, gesture) => { 
                position.setValue({ x: gesture.dx, y: gesture.dy });
            }, //User start to drag around
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }, //User let go
        });

        this.state = { panResponder, position, index: 0 };
    }

    onSwipeComplete(direction) {
        const { onSwipeRight, onSwipeLeft, data } = this.props;
        const item = data[this.state.index];
        if (direction === 'right') {
            onSwipeRight(item);
        } else {
            onSwipeLeft(item);
        }
        this.setState({ index: this.state.index + 1 });
        this.state.position.setValue({ x: 0, y: 0 });
    }

    getCardAnimationStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
            outputRange: ['-120deg', '0deg', '120deg']
        });
        return {
            ...this.state.position.getLayout(), //getLayout returns an object
            transform: [{ rotate }]
        };
    }

    forceSwipe(direction) {
        const dir = direction === 'right' ? 1 : -1;
        Animated.timing(this.state.position, {
            toValue: { x: dir * SCREEN_WIDTH * 1.5, y: 0 },
            duration: SWIPE_OUT_DURATION,
        }).start(() => this.onSwipeComplete(direction));
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    renderCards() {
        const { renderCard, data } = this.props;
        return data.map((i, idx) => {
            if (idx === this.state.index) {
                return (
                    <Animated.View 
                        key={i.id}
                        style={this.getCardAnimationStyle()} 
                        {...this.state.panResponder.panHandlers}
                    >
                        {renderCard(i)}    
                    </Animated.View>
                );
            } else if (idx > this.state.index) {
                return renderCard(i);
            } 
            return null;
        });
    }

    render() {
        return (
            <View>
                {this.renderCards()}  
            </View>
        );
    }
}

export default Deck;
