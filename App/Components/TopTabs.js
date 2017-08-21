/* @flow */

import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'
// import SimplePage from './OrLine'
import styles from './Styles/TopTabsStyle'
import LinearGradient from 'react-native-linear-gradient'
import { Metrics, Colors, Fonts, Images } from '../Themes/'
import ProductList from '../Components/ProductList'
import HorizontalCategoryList from '../Components/HorizontalCategoryList'
import BackGround from '../Components/BackgroundImage'

export default class TopBarTextExample extends PureComponent {
  static title = 'Scrollable top bar';
  static appbarElevation = 0;

  state = {
    index: 1,
    routes: [
      { key: '1', title: 'EXPLORE' },
      { key: '2', title: 'FEATURE' },

    ]
  };
  //
  // </LinearGradient>

  _handleChangeTab = index => {
    let scene = {}
    if (index === 1) {
      scene = {
        route: {
          key: 1
        }
      }
      this._renderScene(scene);
    } else {
      scene = {
        route: {
          key: 1
        }
      }
      this._renderScene(scene);
    }
  };

  _renderHeader = props => {
    return (
      <View>

        <LinearGradient
          colors={[Colors.mainColor, Colors.mainColor, Colors.topTransparent]}
          start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
          locations={[0, 0.25, 1]}
          style={styles.linearGradient}>
          <TouchableOpacity style={styles.notifyImage}>
            <Image
              source={Images.notificationIcon}
              style={styles.image}
              resizeMode='cover'
            />
          </TouchableOpacity>
        </LinearGradient>
        <TabBar
          {...props}
          scrollEnabled
          indicatorStyle={styles.indicator}
          style={styles.tabbar}
          tabStyle={styles.tab}
          labelStyle={styles.label}
        />
        <LinearGradient
          colors={[Colors.mainColor, Colors.mainColor, Colors.topTransparent]}
          start={{ x: 1.0, y: 1.0 }} end={{ x: 0.0, y: 1.0 }}
          locations={[0, 0.30, 1]}
          style={styles.linearGradientSearch}>
          <TouchableOpacity style={styles.searchImage}>
            <Image
              source={Images.searchIcon}
              style={styles.image}
              resizeMode='cover'
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>

    )
  };

  _renderScene = scene => {
    switch (scene.route.key) {
      case '1':
        return this.props.children
      case '2':
        return this.props.children
      case '3':
        return this.props.children      
      case '4':
        return this.props.children
      case '5':
        return null
      default:
        return null
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    )
  }
}
// <LinearGradient
        //   colors={[Colors.main, Colors.main, Colors.topTransparent]}
        //   start={{x: 0.9, y: 1.0}} end={{x: 0.0, y: 1.0}}
        //   locations={[0, 0.1, 1]}
        //   style={styles.linearGradient}>

        // </LinearGradient>
