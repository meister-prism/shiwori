package com.shiwori_app;
import com.facebook.react.ReactActivity;
import it.innove.BleManagerPackage;

import java.util.List;
import java.util.Arrays;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

public class MainActivity extends ReactActivity {
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new BleManagerPackage() 
        );
    }

    @Override
    protected String getMainComponentName() {
        return "shiwori_app";
    }
}
