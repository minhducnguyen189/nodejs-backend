const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const templates = require('./routes/templates');
const binding = require('./routes/binding');
const generate = require('./routes/generate');


app.set("view engine", "hbs");
app.set('views', './templates');
hbs.registerPartials(path.join(__dirname, 'templates/partials'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/report/engine/templates', templates);
app.use('/report/engine/templates/binding', binding);
app.use('/report/engine/templates/generate', generate);


const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));