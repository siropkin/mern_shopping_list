const express = require('express');
const { connect } = require('mongoose');
const bodyParser = require('body-parser');
const { mongodbUri } = require('./config/key');
const { now } = require('./utils');

const items = require('./routes/api/v1/items');

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(`${ now() } MongoDB connected`))
  .catch(err => console.log(`${ now() } MongoDB connection error : ${ err }`));

// Use Routes
app.use('/api/items', items);

// Run server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`${ now() } Server started on port ${ port }`));
