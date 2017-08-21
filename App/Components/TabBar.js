/**
 * Created by Devsteam.mobi on 11/21/16.
 */
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Fonts, Images } from '../Themes'
import I18n from 'react-native-i18n'

class AndroidTabBar extends React.Component {
  tabIcons = []

  static propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  }

  getIcon(index) {
    switch (index) {
      case 0:
        return this.props.activeTab == 0 ? Images.home : Images.home
      case 1:
        return this.props.activeTab == 1 ? Images.filtter : Images.filtter
      case 2:
        return this.props.activeTab == 2 ? Images.centerMenu : Images.centerMenu
      case 3:
        return this.props.activeTab == 3
          ? Images.conversation
          : Images.conversation
      case 4:
        return this.props.activeTab == 4
          ? Images.profileIcon
          : Images.profileIcon
    }
  }
  // todo this.props.goToPage(0)
  render() {
    return (
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <View style={styles.centerView}>
          <TouchableOpacity onPress={() => Actions.AddPost()}>
            <Image source={Images.centerMenu} resizeMode='cover' />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.props.showFilterModal}
            // onPress={() => {}}
            style={{
              width: 25,
              height: 25,
              position: 'absolute',
              zIndex: 6,
              left: 0,
              top: 14
            }}
          />

          <TouchableOpacity
            // onPress={() => {}}
            onPress={Actions.Conversations}
            style={{
              width: 25,
              height: 25,
              position: 'absolute',
              zIndex: 6,
              right: 0,
              top: 14
            }}
          />
        </View>

        <View style={[styles.tabs]}>

          <View style={styles.dualTabContainer}>
            <View>
              <TouchableOpacity
                key={0}
                onPress={this.props.goToHome ? this.props.goToHome : () => Actions.HomeScreen({ type: 'reset' })}
                style={styles.tab}
              >
                <View style={styles.tabContainer}>
                  <Image
                    source={this.getIcon(0)}
                    resizeMode={'contain'}
                    style={styles.image}
                  />
                  {/* <Text style={[styles.title, {color: color}]}>{this.getTitle(i)}</Text> */}
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                key={1}
                onPress={this.props.showFilterModal}
                style={[
                  styles.tab,
                  {
                    borderLeftWidth: StyleSheet.hairlineWidth,
                    borderLeftColor: '#9D9D9D'
                  }
                ]}
              >
                <View style={styles.tabContainer}>
                  <Image
                    source={this.getIcon(1)}
                    resizeMode={'contain'}
                    style={styles.image}
                  />
                  {/* <Text style={[styles.title, {color: color}]}>{this.getTitle(i)}</Text> */}
                </View>
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.dualTabContainer}>

            <View>
              <TouchableOpacity
                key={3}
                onPress={Actions.Conversations}
                style={[
                  styles.tab,
                  { borderRightWidth: 1, borderRightColor: '#9D9D9D' }
                ]}
              >
                <View style={styles.tabContainer}>
                  <Image
                    source={this.getIcon(3)}
                    resizeMode={'contain'}
                    style={styles.image}
                  />
                  {/* <Text style={[styles.title, {color: color}]}>{this.getTitle(i)}</Text> */}
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                key={4}
                onPress={() => Actions.UserProfile()}
                style={styles.tab}
              >
                <View style={styles.tabContainer}>
                  <Image
                    source={this.getIcon(4)}
                    resizeMode={'contain'}
                    style={styles.image}
                  />
                  {/* <Text style={[styles.title, {color: color}]}>{this.getTitle(i)}</Text> */}
                </View>
              </TouchableOpacity>
            </View>

          </View>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4
  },
  tabs: {
    height: 48,
    flexDirection: 'row',
    paddingTop: 0,
    borderWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderTopColor: 'rgba(0,0,0,0.3)',
    backgroundColor: '#E4E4E4',
    justifyContent: 'space-between'
  },
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  image: {
    height: 28,
    width: 28
  },
  dualTabContainer: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-around',
    backgroundColor: '#E4E4E4'
  },
  centerView: {
    zIndex: 5,
    elevation: 0.5,
    height: 72,
    width: 200,
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? -10 : -10,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AndroidTabBar
