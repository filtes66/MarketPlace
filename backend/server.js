const PORT = 5000;
import express, { Router } from "express";
import { urlencoded, json } from "body-parser";
import cors from "cors";
const app = express();
app.use(express.static("public"));
const routes = Router();
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
import { MongoClient } from "mongodb";
import { URI_DB } from "../constants/environment";
const uri = URI_DB;
//  "mongodb+srv://philtest:Magefreud66@cluster-marketplace.0vfnb.mongodb.net/marketplace?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connect to server
app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT}`);
});

// connect to DB
const DATABASE = "marketplace";
client.connect((err) => {
  if (err) {
    throw Error(err);
  }
  !err && console.log(`Successfully connected to database`);
  const db = client.db(DATABASE);
  const photos = db.collection("photos");

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
        res.status(200).send({ results });
      })
      .catch((err) => res.send(err));
  });

  const exampleObj = {
    id: 29999,
    category: "Clothes",
    name: "Winter Jacket for Women, All sizes",
    price: 79,
  };
  routes.post("/photos/add", jsonParser, function (req, res) {
    photos
      .insertOne(req.body)
      .then(() => res.status(200).send("successfully inserted new document"))
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });
});

//routes
/*routes.get("/", (req, res) => {
  res.send("Hello World!");
});*/
