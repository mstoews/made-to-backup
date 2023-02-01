// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import 'zone.js/plugins/zone-error';

export let environment: { production: boolean; api: { stripeUrl: string; baseUrl: string; createMessage: string; createUser: string }; firebase: { storageBucket: string; apiKey: string; messagingSenderId: string; appId: string; projectId: string; measurementId: string; authDomain: string }; useEmulators: boolean };
environment = {
  firebase: {
    apiKey: "AIzaSyAoyvHYrm3X8JkcpsPBkjKKyYMvO2yp3H4",
    authDomain: "made-to-dev.firebaseapp.com",
    projectId: "made-to-dev",
    storageBucket: "made-to-dev.appspot.com",
    messagingSenderId: "943801679790",
    appId: "1:943801679790:web:fc1acc16908ea3a4bc123f",
    measurementId: "G-4YP76MJH8S"
  },
  production: false,
  useEmulators: false,
  api: {
    baseUrl: "https://made-to-dev.df.r.appspot.com",
    stripeUrl: "http://localhost:9000",
    createMessage: "https://us-central1-made-to-dev.cloudfunctions.net/createMessage",
    createUser: "https://us-central1-made-to-dev.cloudfunctions.net/createUser"
  }
};

/*  "http://localhost:9000",
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.