package com.edigits.sellnow;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.maps.MapsPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.magus.fblogin.FacebookLoginPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.rnfs.RNFSPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;  
import com.sbugert.rnadmob.RNAdMobPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import cl.json.RNSharePackage;
import com.krazylabs.OpenAppSettingsPackage;
import com.rjblopes.opensettings.OpenSettingsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SnackbarPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new LinearGradientPackage(),
            new MapsPackage(),
            new RNGoogleSigninPackage(),
            new ReactNativeI18n(),
            new VectorIconsPackage(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage(),
            new FacebookLoginPackage(),
            new RNGeocoderPackage(),
            new RNFSPackage(),
            new ReactNativeRestartPackage(),
            new RNAdMobPackage(),
            new FIRMessagingPackage(),
            new RNSharePackage(),
            new OpenAppSettingsPackage(),
            new OpenSettingsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
