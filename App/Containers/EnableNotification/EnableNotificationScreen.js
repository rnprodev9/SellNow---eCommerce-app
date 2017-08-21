import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Background from '../../Components/BackgroundImage'
import LogoImage from '../../Components/LogoImage'
import Button from '../../Components/FullButton'
import OrLine from '../../Components/OrLine'
// Styles
import styles from './EnableNotificationScreenStyle'
import { Images } from '../../Themes';
import { observe } from 'mobx';
import { observer } from 'mobx-react/native';
import NotificationComponent from '../../Components/NotificationComponent'
import vm from './EnableNotificationStore'
import TopBar from '../..//Components/TopBar'
import I18n from 'react-native-i18n'

@observer
export default class EnableNotificationScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TopBar
          disableLeftImage
          title={I18n.t("notification")}
          rightText={I18n.t('next')}
          rightAction={() => {
            vm.onStartUp();
            vm.redirctToMainScreen()
          }
          }
        />
        <NotificationComponent
          notificaion
          EnableNotifications={vm.enableNotifications}
        />
      </View>
    )
  }

}
