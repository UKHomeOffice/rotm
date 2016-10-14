# ROTM Application project for nodejs

[![Docker Repository on Quay.io](https://quay.io/repository/ukhomeofficedigital/rotm-app/status "Docker Repository on Quay.io")](https://quay.io/repository/ukhomeofficedigital/rotm-app)
[![Build Status](https://drone.digital.homeoffice.gov.uk/api/badges/UKHomeOffice/rotm/status.svg)](https://drone.digital.homeoffice.gov.uk/UKHomeOffice/rotm)


## Quick start

Install the dependencies and build the project resources
```bash
$ npm install
```

Initiate the server in development mode (Express is used to serve the static resources in development).
```bash
$ npm run dev
```

The app runs on the path /report-terrorism

Then select one of the following journeys to see the application in action

## NPM scripts

Start the application in default mode (production).
We use Nginx to serve our static resources in production and ci.
```bash
$ npm start
```

Start the application with [Nodemon](https://www.npmjs.com/package/nodemon) in development mode.
Debug is switched on and the server restarts when the JS or Sass are recompiled.
```bash
$ npm run dev
```

Run the unit tests
```bash
$ npm run test
```

Run the EcmaScript (ES) linter.  Rules are defined in [.eslintrc](./.eslintrc)
```bash
$ npm run lint
```

Run the jscs style checker. Rules are defined in [.jscsrc](./.jscsrc)
```bash
$ npm run style
```

Compile the Sass to CSS
```bash
$ npm run sass
```

_____________________________________________________________

- For details on [Acceptance tests](https://github.com/UKHomeOffice/RTM/tree/master/acceptance_tests)

- See the [package.json](./package.json) for a full list of scripts.

- Full list of [environment variables](./documentation/ENVIRONMENT_VARIABLES.md)

touched
