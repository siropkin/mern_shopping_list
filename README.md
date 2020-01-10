# Simple MERN Shopping List Example

![Demo screenshot](mern_shopping_list_demo.png)
Example of a fullstack app using MongoDB, Express, React and Node.js (MERN).

You will need to edit the MongoDB connection string in **config/key.js** to your own.

Ready to deploy on Heroku.

Demo: https://mern-shp-lst.herokuapp.com/

## Quick Start

Add your MONGO_URI to the default.json file. Make sure you set an env var for that and the jwtSecret on deployment

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:4000
```

## Deployment

There is a Heroku post build script so that you do not have to compile your React frontend manually, it is done on the server. Simply push to Heroku and it will build and load the client index.html page

## Author

[Ivan Seredkin](https://srdkn.com)

