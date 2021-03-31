// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const server = 'https://46fd37f55069.ngrok.io'+'/mart';
export const environment = {
  production: false,
  backendUrl: server,
  api:{
      user:{
       create: `${server}/user/create`,
       update: `${server}/user/update`,
       isMobileRegistered: `${server}/user/isMobileRegistered`,
       profile: `${server}/user/profile`,
       login: `${server}/user/authenticate`,
      },
      address:{
        create: `${server}/address/create`,
        update: `${server}/address/update`,
        remove: `${server}/address/remove`,
        all: `${server}/address/all`,
        default: `${server}/address/default`,
       }
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
