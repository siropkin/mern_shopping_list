const express = require('express');
const { connect } = require('mongoose');
const { now } = require('./utils');
const path = require('path');
const config = require('config');

const app = express();
app.use(express.json());

// Connect to MongoDB
const mongodbUri = config.get('mongodbUri');
connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log(`${ now() } MongoDB connected`))
  .catch(err => console.log(`${ now() } MongoDB connection error : ${ err }`));

// Use Routes
app.use('/api/items', require('./routes/api/v1/items'));
app.use('/api/users', require('./routes/api/v1/users'));
app.use('/api/auth', require('./routes/api/v1/auth'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Run server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`${ now() } App started on port ${ port }`));
