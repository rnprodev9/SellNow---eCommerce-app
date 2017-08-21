package com.edigits.sellnow;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.modules.i18nmanager.I18nUtil;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SellNow";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {    
    setTheme(R.style.AppTheme);    
    I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
    sharedI18nUtilInstance.allowRTL(getApplicationContext(), false);
    super.onCreate(savedInstanceState);
  }

}
