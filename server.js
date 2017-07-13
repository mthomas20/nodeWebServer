const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


app.use((req, res, next) => {

  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
//maintenance mode!
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     title: 'Under construction',
//     message: 'Web site is down due to maintenance'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('transformText', (text) => {

  return text.toUpperCase();
});




app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Home Page',
    welcomeMsg: 'Hello, ',
    user: {
      name: 'Mike',
      like: ['Hiking', 'Singing']
    }
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page'
  });
});


app.listen('3000', () => {
  console.log('App running on port 3000.');
});
