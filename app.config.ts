import { ConfigContext, ExpoConfig } from "expo/config"

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.xolaceincorg.KtuSrcAppOfficial.dev';
  }

  if (IS_PREVIEW) {
    return 'com.xolaceincorg.KtuSrcAppOfficial.preview';
  }

  return 'com.xolaceincorg.KtuSrcAppOfficial';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'KTU SRC (Dev)';
  }

  if (IS_PREVIEW) {
    return 'KTU SRC (Preview)';
  }

  return 'KTU SRC';
};



export default (config: ConfigContext): ExpoConfig => ( {
    ...config,
    "name": getAppName(),
    "slug": "ktu_src_app_official",
    "version": "1.0.0",
    "orientation": "portrait",
    "scheme": "ktusrcappofficial",
    "userInterfaceStyle": "automatic",
    "ios": {
      "icon": "./assets/ktu-src.icon",
      "bundleIdentifier": getUniqueIdentifier(),
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false
      }
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#B1DEFF",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "predictiveBackGestureEnabled": false,
      "package": getUniqueIdentifier()
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow $(PRODUCT_NAME) to access your photos to let you select a photo."
        }
      ],
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#B1DEFF",
          "android": {
            "image": "./assets/images/icons/splash-icon-dark.png",
            "imageWidth": 200
          },
          "ios": {
            "image": "./assets/images/icons/splash-icon-dark.png",
            "imageWidth": 200,
            "dark":{
              "image": "./assets/images/icons/splash-icon-light.png",
              "backgroundColor": "#B1DEFF"
            }
          }
        }
      ],
      "expo-font",
      "expo-image",
      "expo-web-browser"
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "c621c3e4-72cf-4126-9dbe-5e82e4ddc79a"
      }
    },
    "owner": "xolace-inc-org"
  })