const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const colors = require('colors');
const morgan = require('morgan');

// Access config variables
dotenv.config({ path: './config/config.env' });

// Access route files
const posts = require('./routes/posts');

// Initialize App
const app = express();

// Use Express parser
app.use(express.json());

// Log what's happening
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/posts', posts);

// Use error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// If Promise is rejected
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
