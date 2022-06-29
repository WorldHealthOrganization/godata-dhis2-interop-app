# DHIS2-Go.Data Interoperability App 
Documentation site here: [https://worldhealthorganization.github.io/godata-dhis2-interop-app/](https://worldhealthorganization.github.io/godata-dhis2-interop-app/)

## Overview
The DHIS2-Go.Data Interoperability App enables metadata to be securely exchanged between [DHIS2](https://dhis2.org/) (a widely used system for national health information management developed by the University of Oslo) and [Go.Data](https://www.who.int/tools/godata) (an outbreak response tool developed by WHO). This includes exchange of reference metadata used across both platforms (i.e. location hierarchies, facility lists); and case/contact data (cases being registered and investigated; and their contacts who are being listed and traced). 

Such an integration enables field teams to make use of additional visualizations for chains of transmission and contact tracing follow up in Go.Data during an acute outbreak scenario while ensuring key field intel gets reflected back into overarching DHIS2 system. 

This project was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner and runs all available tests found in `/src`.<br />

See the section about [running tests](https://platform.dhis2.nu/#/scripts/test) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
A deployable `.zip` file can be found in `build/bundle`!

See the section about [building](https://platform.dhis2.nu/#/scripts/build) for more information.

## Learn More

You can learn more about the platform in the [DHIS2 Application Platform Documentation](https://platform.dhis2.nu/).

You can learn more about the runtime in the [DHIS2 Application Runtime Documentation](https://runtime.dhis2.nu/).

To learn React, check out the [React documentation](https://reactjs.org/).

## Feedback and contact

For any questions or feedabck, please contact godata@who.int or post on the Go.Data Community of Practice here: https://community-godata.who.int/

## Bidirectionality tasks note

The bidirectional tasks endpoint is /livetask, its logic can be found in ./src/views/interop_tasks/LiveForm folder.
