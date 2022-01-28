# enzoTopMAL

Application de toplist avec un système de tri par genre.

Plugins cordova présents : 

-Splashscreen
-Device
-InAppBrowser
-BatteryStatus

## Installation

```sh
$ npm install
```

## Cordova

Android
```sh
$ cordova platform add/remove android
$ cordova build/emulate/run android
```

Browser
```sh
$ cordova platform add/remove browser
$ cordova build/emulate browser
```

## Push Notification (OneSignal) :
To enable notification (might generate bugs with it enabled) :
Decomment the line 47 to 50 in /www/index.html
```sh
<!-- <script
      src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
      async=""
></script> -->
```
