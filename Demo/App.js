import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';

import {createResponder} from 'react-native-gesture-responder';

const {width, height} = Dimensions.get('window');

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gestureState: {},
      thumbSize: 100,
      left: width / 2,
      top: height / 2
    }
  }

  componentWillMount() {
    console.log('componentWillMount...');
    createResponder.enableDebugLog();
    this.gestureResponder = createResponder({
      onStartShouldSetResponder: (evt, gestureState) => true,
      onStartShouldSetResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetResponder: (evt, gestureState) => true,
      onMoveShouldSetResponderCapture: (evt, gestureState) => true,

      onResponderGrant: (evt, gestureState) => {
      },
      onResponderMove: (evt, gestureState) => {
        let thumbSize = this.state.thumbSize;
        if (gestureState.pinch && gestureState.previousPinch) {
          thumbSize *= (gestureState.pinch / gestureState.previousPinch)
        }
        let {left, top} = this.state;
        left += (gestureState.moveX - gestureState.previousMoveX);
        top += (gestureState.moveY - gestureState.previousMoveY);

        this.setState({
          gestureState: {
            ...gestureState
          },
          left, top, thumbSize
        })
      },
      onResponderTerminationRequest: (evt, gestureState) => true,
      onResponderRelease: (evt, gestureState) => {
        this.setState({
          gestureState: {
            ...gestureState
          }
        })
      },
      onResponderTerminate: (evt, gestureState) => {
      }
    });
  }

  render() {
    const thumbSize = this.state.thumbSize;
    return (
      <View
        style={{flex: 1, backgroundColor: '#66ccff', padding: 20, alignItems: 'center', justifyContent: 'center'}}
        {...this.gestureResponder}>

        <LabelView
          label='stateID'
          value={this.state.gestureState.stateID}/>
        <LabelView
          label='moveX'
          value={this.state.gestureState.moveX}/>
        <LabelView
          label='moveY'
          value={this.state.gestureState.moveY}/>
        <LabelView
          label='previousMoveX'
          value={this.state.gestureState.previousMoveX}/>
        <LabelView
          label='previousMoveY'
          value={this.state.gestureState.previousMoveY}/>
        <LabelView
          label='x0'
          value={this.state.gestureState.x0}/>
        <LabelView
          label='y0'
          value={this.state.gestureState.y0}/>
        <LabelView
          label='dx'
          value={this.state.gestureState.dx}/>
        <LabelView
          label='dy'
          value={this.state.gestureState.dy}/>
        <LabelView
          label='vx'
          value={this.state.gestureState.vx}/>
        <LabelView
          label='vy'
          value={this.state.gestureState.vy}/>
        <LabelView
          label='singleTapUp'
          value={this.state.gestureState.singleTapUp}/>
        <LabelView
          label='doubleTapUp'
          value={this.state.gestureState.doubleTapUp}/>
        <LabelView
          label='pinch'
          value={this.state.gestureState.pinch}/>
        <LabelView
          label='previousPinch'
          value={this.state.gestureState.previousPinch}/>

        <View
          style={{
          width: thumbSize,
          height: thumbSize,
          position: 'absolute',
          left: this.state.left - thumbSize/2,
          top: this.state.top - thumbSize/2,
          backgroundColor: '#ffffff99',
          alignItems: 'center',
          justifyContent: 'center'
          }}
          pointerEvents='none'>
          <Text >Move or Pinch</Text>
        </View>

      </View>
    );
  }
}

class LabelView extends Component {
  render() {
    return (
      <View
        style={{flexDirection: 'row', alignSelf: 'stretch'}}>
        <Text style={{flex: 3, textAlign: 'right', marginRight: 10}}>{this.props.label}</Text>
        <Text style={{flex: 7, textAlign: 'left', marginLeft: 10}}>{JSON.stringify(this.props.value)}</Text>
      </View>
    );
  }
}