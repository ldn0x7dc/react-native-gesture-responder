import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';

import {createResponder} from 'react-native-gesture-responder';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gestureState: {},
      thumbSize: 100
    }

    this.onGestureStateUpdated = this.onGestureStateUpdated.bind(this);
  }

  onGestureStateUpdated(gestureState) {
    let thumbSize = this.state.thumbSize;
    if(gestureState.pinch && gestureState.previousPinch) {
      thumbSize *= (gestureState.pinch / gestureState.previousPinch)
    }

    this.setState({
      gestureState: {
        ...gestureState
      },
      thumbSize
    })
  }

  componentWillMount() {
    console.log('componentWillMount...');
    this.gestureResponder = createResponder({
      onStartShouldSetResponder: (evt, gestureState) => true,
      onStartShouldSetResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetResponder: (evt, gestureState) => true,
      onMoveShouldSetResponderCapture: (evt, gestureState) => true,

      onResponderGrant: (evt, gestureState) => {
        this.onGestureStateUpdated(gestureState);
      },
      onResponderMove: (evt, gestureState) => {
        this.onGestureStateUpdated(gestureState);
      },
      onResponderTerminationRequest: (evt, gestureState) => true,
      onResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.onGestureStateUpdated(gestureState);
      },
      onResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      }
    });
  }

  render() {
    let thumbView;
    const thumbSize = this.state.thumbSize;

    if(this.state.gestureState.moveX && this.state.gestureState.moveY) {
      thumbView = (
        <View
          style={{
          width: thumbSize,
          height: thumbSize,
          position: 'absolute',
          left: this.state.gestureState.moveX - thumbSize/2,
          top: this.state.gestureState.moveY - thumbSize/2,
          backgroundColor: 'red'
          }}
          pointerEvents='none'
        />
      );
    }

    return (
      <View
        style={{flex: 1, backgroundColor: '#66ccff', padding: 20}}
        {...this.gestureResponder}>
        <Text style={{height: 200}}>{JSON.stringify(this.state.gestureState)}</Text>
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
        {thumbView}

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