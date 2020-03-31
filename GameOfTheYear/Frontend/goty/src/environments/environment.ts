// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'https://us-central1-angular-login-project.cloudfunctions.net',
  // tengo la url de producción en desarrollo porque firebase no acepta node 12
  firebase: {
    apiKey: 'AIzaSyCZaSP51C-hiS-m52rCtQhm3sVyrdr4UwY',
    authDomain: 'angular-login-project.firebaseapp.com',
    databaseURL: 'https://angular-login-project.firebaseio.com',
    projectId: 'angular-login-project',
    storageBucket: 'angular-login-project.appspot.com',
    messagingSenderId: '299131633727',
    appId: '1:299131633727:web:00c37346fe52099393f88a',
    measurementId: 'G-6WP3BDJ91K'
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
