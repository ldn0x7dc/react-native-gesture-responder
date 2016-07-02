# react-native-gesture-responder

A more convenient and powerful gesture responder than the official PanResponder.



## Install

`npm install --save react-native-gesture-responder@latest`



## Documentation

Have a glance of how to use it:

```
import {createResponder} from 'react-native-gesture-responder';
...
componentWillMount() {
  this.gestureResponder = createResponder({
    onStartShouldSetResponder: (evt, gestureState) => true,
    onStartShouldSetResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetResponder: (evt, gestureState) => true,
    onMoveShouldSetResponderCapture: (evt, gestureState) => true,
    onResponderGrant: (evt, gestureState) => {},
    onResponderMove: (evt, gestureState) => {},
    onResponderTerminationRequest: (evt, gestureState) => true,
    onResponderRelease: (evt, gestureState) => {},
    onResponderTerminate: (evt, gestureState) => {},
    
    moveThreshold: 5
    onResponderSingleTapConfirmed: (evt, gestureState) => {}
  });
}

render() {
  
  return (
    <View
      {...this.gestureResponder}>
		...
    </View>
  );
}
```

The API is quite same of the [official one](https://facebook.github.io/react-native/docs/gesture-responder-system.html). Differences are:

1. Every lifecycle callback is called with an additional argument **gestureState**, which is also quite same as the **PanResponder** but contains more info.
2. The config object can provide another value named **moveThreshold** (defaults to 2 if not provided), which is used to avoid too sensitive move events when simply tap the screen(mainly on Android).
3. **onResponderSingleTapConfirmed** : as the name says.

The **gesture** object has the following(a super set of PanResponder):

* `stateId`
* `moveX` and `moveY`
* `x0` and `y0`
* `dx` and `dy`: **accumulated** distance of the gesture since the touch started(confusing names)
* `vx` and `vy`: per millisec(PanResponder is inconsistant with different react-native version, as [this issue](https://github.com/facebook/react-native/issues/8104) mentioned)
* `numberActiveTouches`
* `previousMoveX` and `previousMoveY`: you can use `moveX - previousMoveX` to calculate latest move distance
* `pinch` and `previousPinch`: useful number values when implementing zoom feature. Will be undefined if no pinch occured
* `singleTapUp`: a bool value indicating if a single tap up occured
* `doubleTapUp`: a bool value indicating if a double tap up occured




## Debug

If the responder is not working as you expected, you can enable lifecycle logs, which prints all the onResponderXXX events. 

But do **NOT** use this in production for performance consideration.

```
import {createResponder} from 'react-native-gesture-responder';
...
createResponder.enableDebugLog();
```



## Application

Refer to *Demo* folder for a simple demonstration, as below shows:

![](Demo/demo.gif)

For more complicated use cases, pls refer to [react-native-view-transformer](https://github.com/ldn0x7dc/react-native-view-transformer) and [react-native-gallery](https://github.com/ldn0x7dc/react-native-gallery).