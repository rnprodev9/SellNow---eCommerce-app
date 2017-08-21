import React from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { Images, Colors } from '../../Themes'
import TopBar from '../../Components/TopBar'
import I18n from 'react-native-i18n'
// Styles
import styles from './PrivacyStyle'

export default class Privacy extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TopBar
            backgroundColor={Colors.mainColor}
            leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}
            leftText={I18n.t('Back')}
            title={I18n.t('privacy')}
          />
          <View style={styles.Content}>
            <View style={styles.ImageView}>
              <Image
                source={Images.Privacy}
                resizeMode='stretch'
                style={styles.image}
              />
            </View>
            <View style={styles.middleView}>
              <Text style={styles.textTitle}>{I18n.t('privacy')}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.descriptionText}>
                Exercitation enim labore dolor elit ipsum. Exercitation, utdolor qui officia labore exercitation, fugiat, dolor anim.Commodo adipisicing dolore est sint tempor. In ipsumdolore magna ut sint laboris cupidatat magna id eu cillumnulla velit? Elit commodo, labore occaecat et eu laboreincididunt ut sunt enim, non ut nulla.Nostrud est laborum elit officia commodo officia elit do,esse laboris velit dolor. Veniam commodo sit elitexercitation occaecat sint, ipsum dolore reprehenderitpariatur reprehenderit. Dolore anim dolor, voluptate ullamco. Aute officia irure excepteur qui ullamco reprehenderit nulla? Et elit anim ut laboris nostrud aliqua quisexercitation. Ut, est enim nostrud lorem est: Esse in, exea. Cillum ipsum labore ipsum deserunt, aute cupidatatNostrud est laborum elit officia commodo officia elit do,esse laboris velit dolor. Veniam commodo sit elitexercitation occaecat sint, ipsum dolore reprehenderitpariatur reprehenderit. Dolore anim dolor, voluptate Exercitation enim labore dolor elit ipsum. Exercitation, utdolor qui officia labore exercitation, fugiat, dolor anim.Commodo adipisicing dolore est sint tempor. In ipsumdolore magna ut sint laboris cupidatat magna id eu cillumnulla velit? Elit commodo, labore occaecat et eu laboreincididunt ut sunt enim, non ut nulla.Nostrud est laborum elit officia commodo officia elit do,esse laboris velit dolor. Veniam commodo sit elitexercitation occaecat sint, ipsum dolore reprehenderitpariatur reprehenderit. Dolore anim dolor, voluptate ullamco. Aute officia irure excepteur qui ullamco reprehenderit nulla? Et elit anim ut laboris nostrud aliqua quisexercitation. Ut, est enim nostrud lorem est: Esse in, exea. Cillum ipsum labore ipsum deserunt, aute cupidatatNostrud est laborum elit officia commodo officia elit do,esse laboris velit dolor. Veniam commodo sit elitexercitation occaecat sint, ipsum dolore reprehenderitpariatur reprehenderit. Dolore anim dolor, voluptate
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
