const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
	var now = new Date().toString();

	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (e) => {
		if (e) 
			console.log('Unable to append to server log.')
	});
	next();
});/* express middleware teaches express how to do stuff */

app.use((req, res, next) => {
	res.render('maintenance.hbs', {
		pageTitle: 'Maintenance Page',
		maintainMessage: 'We are under construction'
	})
})


app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

app.get('/', (req, res) => {
	res.render('home', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to Home Page'
	});
});

app.get('/about', (req, res)=>{
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: 'Unable to render the page'
	});
});

app.listen('3000', () => {console.log("server up and running on port 3000")});