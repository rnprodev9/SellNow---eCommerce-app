import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Background from '../../Components/BackgroundImage'
import LogoImage from '../../Components/LogoImage'
import Button from '../../Components/FullButton'
import OrLine from '../../Components/OrLine'
// Styles
import styles from './MainLoginStyle'
import { Images } from '../../Themes';
import {observe} from 'mobx';
import { observer } from 'mobx-react/native';
import MainLoginScreenStore from './MainLoginStore'

@observer
export default class MainLoginScreen extends React.Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <Background image={Images.splash0} />
        <View style={styles.blurView}>
          <LogoImage style={{marginTop: 120}}/>
          <Button text='Login With Facebook' style={styles.loginFb}/>
          <Button text='Login With Google' style={[styles.loginFb, {marginTop: 10}]}/>          
          <OrLine />
          <Button 
            onPress={this.onLoginPress}
            text='Log in Now' 
            style={[styles.loginFb, {backgroundColor: 'white'}]} 
            styleText={{color: '#2A2722'}}/>
        </View>
      </View>
    )
  }

}
