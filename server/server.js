const YOUR_DOMAIN = 'http://localhost:2000';
const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const bodyParser = require('body-parser');

const Stripe = require('stripe');
const stripe = Stripe(process.env.SECRET_KEY);

const urlencoded = bodyParser.urlencoded;
const json = bodyParser.json;

const cors = require("cors");
const app = express();
app.use(express.static('../public'));

const routes = express.Router();

app.use((req, res, next) => {
    console.log(`Received a ${req.method} request to ${req.url}`);
    next();
});

app.use("/", routes);

// body-parser
routes.use(urlencoded({ extended: false }));
routes.use(json());
const jsonParser = json();

const corsOptions = {
    origin: "*",
};
//cors
routes.use(cors(corsOptions));

// mongoDB client
const MongoClient = require("mongodb").MongoClient;
//const config = require('../constants/environment.mjs');

//const { URI_DB, SECRET_KEY } = config;

//const uri = URI_DB;
//console.log('uri', uri)
const client = new MongoClient(process.env.URI_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// connect to server
// Vérifiez si PhusionPassenger est défini
if (typeof (PhusionPassenger) !== 'undefined') {
    app.listen('passenger', function () {
        console.log("Server running with Phusion Passenger");
    });
} else {
    // Si PhusionPassenger n'est pas disponible, utilisez le port par défaut
    app.listen(2000, () => {
        console.log(`Server up and running on localhost`);
    });
};

// connect to DB
const DATABASE = "marketplace";
client.connect((err) => {
    if (err) {
        throw Error(err);
    }
    !err && console.log(`Successfully connected to database`);
    const db = client.db(DATABASE);
    const photos = db.collection("photos");
    const users = db.collection("users");

    // perform actions on the collection object
    routes.get("/photos", function (req, res) {
        console.log("photos");
        photos
            .find()
            .toArray()
            .then((error, results) => {
                if (error) {
                    return res.send(error);
                }
                console.log('results', results)
                res.status(200).send({ results });
            })
            .catch((err) => {
                console.error(err);
            });
    })

    routes.post("/photos/add", jsonParser, function (req, res) {
        photos
            .insertOne(req.body)
            .then(() => res.status(200).send("successfully inserted new document"))
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
    });

    //route to get the user's profile with email
    routes.get("/user/:email", function (req, res) {
        users
            .findOne({ email: req.params.email }) //retrieve user profile with email
            .then((error, results) => {
                if (error) {
                    return res.send(error);
                }
                return res.status(200).send(results.data);
            })
            .catch((err) => res.send(err));
    });

    routes.post("/users/add", jsonParser, function (req, res) {
        users
            .insertOne(req.body)
            .then(() => res.status(200).send("successfully inserted new document"))
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
    });

    routes.post("/orders/add", jsonParser, function (req, res) {
        orders
            .insertOne(req.body)
            .then(() => res.status(200).send("successfully inserted new document"))
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
    });

    //const stripe = require("stripe")(process.env.SECRET_KEY);


    routes.post('/create-checkout-session', async (req, res) => {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: req.body,
                mode: "payment",
                success_url: `${YOUR_DOMAIN}/success`,
                cancel_url: `${YOUR_DOMAIN}/cancel`,
            });

            res.json({ id: session.id });
        } catch (err) {
            return res.status(500).send(`failed to process payment ${err}`);
        }
    });

    //const path = require('path');

    routes.get('*', (req, res) => {
        console.log('req');
        // console.log(path.join(__dirname, '..', 'build', 'index.html'));
        //  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
        // res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
        res.sendFile('build/index.html', { root: '..' });

    });

});
