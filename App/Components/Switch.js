import React, { Component, PropTypes } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Animated,
	PanResponder,
	TouchableWithoutFeedback,
	Image
} from 'react-native'
import { Images } from '../Themes'
import Background from './BackgroundImage'

import { Colors } from '../Themes'
export class Switch extends Component {
  static propTypes = {
    onValueChange: PropTypes.func,
    disabled: PropTypes.bool,
    activeText: PropTypes.string,
    inActiveText: PropTypes.string,
    backgroundActive: PropTypes.string,
    backgroundInactive: PropTypes.string,
    value: PropTypes.bool,
    circleActiveColor: PropTypes.string,
    circleInActiveColor: PropTypes.string
  };
  static defaultProps = {
    value: false,
    onValueChange: () => null,
    disabled: false,
    activeText: 'On',
    inActiveText: 'Off',
    backgroundActive: 'gray',
    backgroundInactive: 'white',
    circleActiveColor: 'white',
    circleInActiveColor: 'gray'
  };
  constructor (props, context) {
    super(props, context)

    this.state = {
      value: props.value,
      transformSwitch: new Animated.Value(props.value ? 8 : -42),
      backgroundColor: new Animated.Value(props.value ? 8 : -42),
      circleColor: new Animated.Value(props.value ? 8 : -42)
    }

    this.handleSwitch = this.handleSwitch.bind(this)
    this.animateSwitch = this.animateSwitch.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { disabled } = this.props
    if (nextProps.value === this.props.value) {
      return
    }
    if (disabled) {
      return
    }
    if (this.props.value != nextProps.value) {
      // this.props.onValueChange(nextProps.value)
    }
    this.animateSwitch(nextProps.value, () => {
      this.setState({ value: nextProps.value })
    })
  }

  handleSwitch () {
    const { value } = this.state
    const { onValueChange, disabled } = this.props
    if (disabled) {
      return
    }

    this.animateSwitch(!value, () => {
      this.setState({ value: !value }, () => onValueChange(!value))
    })
  }

  animateSwitch (value, cb = () => { }) {
	  cb()
    Animated.parallel([
      Animated.spring(this.state.transformSwitch, {
        toValue: value ? 1 : -40,
        duration: 200
      }),
      Animated.timing(this.state.backgroundColor, {
        toValue: value ? 75 : -75,
        duration: 200
      }),
      Animated.timing(this.state.circleColor, {
        toValue: value ? 75 : -75,
        duration: 200
      })
    ]).start()
  }

  render () {
    const {
			transformSwitch,
			backgroundColor,
			circleColor
		} = this.state

    const {
			backgroundActive,
			backgroundInactive,
			circleActiveColor,
			circleInActiveColor,
			activeText,
			inActiveText
		} = this.props

    const interpolatedColorAnimation = backgroundColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [backgroundInactive, backgroundActive]
    })

    const interpolatedCircleColor = circleColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [circleInActiveColor, circleActiveColor]
    })

    return (
      <TouchableWithoutFeedback
        onPress={this.handleSwitch}
			>
        <Animated.View

          style={[
            styles.container
          ]}
				>
          <Image source={this.state.value ? Images.toggleButtonbg : Images.toggleButtonbgUnactive} resizeMode='cover' style={this.state.value ? {width: 71, height: 33} : {width: 71, height: 31}}>
            <Animated.View
              style={[
                styles.animatedContainer,
								{ transform: [{ translateX: transformSwitch }] }
              ]}
						>
              <Text style={[styles.text, styles.inactiveText, styles.paddingRight]}>
                {activeText}
              </Text>
              <Animated.View style={[styles.circle, { backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }]} />
              <Image source={Images.toggleButtonDot} style={{width: 29, height: 29}} />
            </Animated.View>
          </Image>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
// 51 / 31

const styles = StyleSheet.create({
  container: {
    width: 83,
    height: 33

		// overflow: 'hidden'
  },
  animatedContainer: {
    flex: 1,
    width: 83,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white'
		// borderWidth: 1,
		// borderColor: 'rgb(100, 100, 100)',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent'
  },
  paddingRight: {
    paddingRight: 10
  },
  paddingLeft: {
    paddingLeft: 10
  }
})
