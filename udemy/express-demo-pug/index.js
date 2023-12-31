const config = require('config');
const Joi = require("joi");
const express = require("express");
const app = express();
const logger = require('./logger');
const authentication = require('./authentication');
const helmet = require('helmet');
const morgan = require('morgan');

app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json());
app.use(logger);
app.use(authentication);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

app.get("/", (req, res) => {
  res.render('index', {title: 'My Express App', message: 'Hello'});
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((ci) => ci.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given Id was not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((ci) => ci.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given Id was not found");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((ci) => ci.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given Id was not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// app.get('/api/courses/:year/:month', (req, res) => {
//     // res.send(req.params);
//     res.send(req.query);
// });

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
