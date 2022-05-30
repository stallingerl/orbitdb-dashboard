<h1 align="center">Dashboard for Smart Meter Data in Orbit-DB</h1>


## Background

This is a dashboard and API for BlockPro - the Blockchain based proof of existence for renewable energy.

The dashboard displays all meter data that was stored in the Doichain and backed up in the IPFS. Therefore, orbit-db is used, where the data can be queried by date, id, meter_id etc. 

The API is an interface for the BlockPro market place. At the market place electricity consumers and producers come together. An electricity transaction is sent to BlockPro via Rest API and stored in the Doichain Blockchain. Data from the offer like meter_id, date and amount of electricity ordered are also stored in OrbitDB. 

If the production and consumption of the ordered electricity has taken place, a matching between meter data and the order is sent back to the market place.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Contributing

<a href="https://github.com/stallingerl/jwt-project/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=stallingerl/jwt-project" />
</a>

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[MIT © 2022 Lena Stallinger.](./LICENSE.txt)