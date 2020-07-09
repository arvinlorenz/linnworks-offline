// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  amplify: {
    aws_project_region: 'ap-southeast-2',
    aws_appsync_graphqlEndpoint: 'https://np77xstj4rgzjb344fbzym3bce.appsync-api.ap-southeast-2.amazonaws.com/graphql',
    aws_appsync_region: 'ap-southeast-2',
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: 'da2-3aapfdxu3fcuvodky3m6uzykoe'
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
