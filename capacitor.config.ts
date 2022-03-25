import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myApp',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      'android-minSdkVersion': '22',
      'android-targetSdkVersion': '28',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreen: 'true',
      FadeSplashScreenDuration: '1500',
      SplashShowOnlyFirstTime: 'false',
      ShowSplashScreen: 'true',
      ShowSplashScreenSpinner: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '100',
      AutoHideSplashScreen: 'false',
      KeyboardDisplayRequiresUserAction: 'false',
      orientation: 'portrait'
    }
  }
};

export default config;
