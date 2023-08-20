const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const express = require("express");
const app = express();
const morgan = require('morgan');


if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}

// DB work...
dbDebugger('Connected to the database...');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
