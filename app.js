const express = require('express');
const app = express();

// sets the engine to pug
app.set('view engine', 'pug');

// sets the static files from the public directory
app.use('/static', express.static('public'));

// imports the routes needed to run the app
const routes = require('./routes');

// call all the routes
app.use(routes);

// 404 error handler
app.use((req, res, next) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  res.render('page-not-found');
});

// global error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';

  console.error(` ${err.status} - ${err.message}`);
  
  res.status(err.status).render('error',  {error: err});
});

// App port listener
app.listen(3000, () => {
  console.log('Server running on port 3000');
});