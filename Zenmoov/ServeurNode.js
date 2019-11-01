var express = require('express');
var hostname = 'localhost';
var port = 3000;
var app = express();
var bodyParser = require("body-parser");
var myRouter = express.Router();
var session = require('express-session');
var cors = require('cors');

app.use(cors({
	origin: [
		'http://localhost:4200'
	], credentials: true
}));
app.use(session({
	secret: "Zenmoov",
	resave: false,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

	myRouter.route('/connexion')
		.post(function (req, res) {
				if (req.body.password === "azerty02" && req.body.email === "testzenmoov@gmail.com") {
					req.session.user = {};
					req.session.user.pwd = req.body.password;
					req.session.user.nom = req.body.email;
					res.json({ loggedIn: true});
				}
			});

	myRouter.route('/connexion')
		.get(function (req, res) {
			req.session.user ? res.status(200).send({ loggedIn: true }) : res.status(200).send({ loggedIn: false });
		});

	myRouter.route('/deconnection')
	.post(function (req, res) {
		req.session.destroy((err) => {
			if (err) {
			  res.status(500).send('Could not log out.');
			} else {
			  res.status(200).send({});
			}
		  });
	});

app.use(myRouter);
app.listen(port, hostname, function () {
	console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
});