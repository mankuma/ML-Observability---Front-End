// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    testRole: true,
    authenticate: true,
    grant_type: "implicit",
    clientId: "a62d840c-5c2f-462a-bc69-1a45ab162f1b",
    tenantId: "de9231de-45f4-4325-ae07-8ae72052517e",
    doAuthToken: "jksfhdssdfugh",
    redirectURI: "http://localhost:4200/",
    authority: "https://login.microsoftonline.com/de9231de-45f4-4325-ae07-8ae72052517e",
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me'
};



// export const environment = {
//     production: false,
//     msalConfig: {
//         auth: {
//             clientId: "a62d840c-5c2f-462a-bc69-1a45ab162f1b",
//             authority: 'https://login.microsoftonline.com/de9231de-45f4-4325-ae07-8ae72052517e',
//             redirectURI: "http://localhost:4200",
//         },
//         cache: {
//             cacheLocation: 'localStorage',
//             storeAuthStateInCookie: false,
//         },
//     },
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
