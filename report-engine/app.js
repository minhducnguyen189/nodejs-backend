const express = require('express');
const app = express();
const pug = require("pug");
const templates = require('./routes/templates');
const binding = require('./routes/binding');
const generate = require('./routes/generate');


app.set("view engine", "pug");
app.set("views", "./templates");
app.use(express.json());
app.use('/report/engine/templates', templates);
app.use('/report/engine/templates/binding', binding);
app.use('/report/engine/templates/generate', generate);


const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));