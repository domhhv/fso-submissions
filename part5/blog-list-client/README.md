# Blog list web client

The application expects the [back-end](https://github.com/dgrishajev/fso-submissions/tree/main/part5/blog-list-app) to be running on port 3003.

## Running

Clone the [top-level repo](https://github.com/dgrishajev/fso-submissions), go to this directory, install dependencies with `npm i` and start the app with `npm start`

## Testing

### Unit

Running once: `CI=true npm test`

Running in watch mode: `npm test`

### End-to-end

Firstly, run the back-end in test environment ([instructions](https://github.com/dgrishajev/fso-submissions/tree/main/part5/blog-list-app#running-for-front-end-e2e)). Also, make sure this client app is running in another tab. Then you can run e2e tests.

Using the graphical test runner: `npm run cypress:open`

Using only CLI: `npm run test:e2e`

## Linting

`npm run lint`
