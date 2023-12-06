const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const schedule = require("node-schedule");
// const gapi = require("gapi-script");
// import gapi from "gapi-script";
// import sample_routes from "./src/test/sample_routes_req.json" assert { type: "json" };

const app = express();
const PORT = process.env.port || 8000;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mypassword",
  database: "Events",
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected");
  let query = "CREATE TABLE IF NOT EXISTS Events(" +
      "id INT NOT NULL auto_increment PRIMARY KEY," +
      "is_enabled  INT," +
      "event_id TEXT," +
      "calendar_id TEXT," +
      "address TEXT," +
      "lat DOUBLE," +
      "lng DOUBLE," +
      "routes TEXT" +
      ");";
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(`Table created or exists ${result}`);
  });
});

const corsOptions = {
  origin: "*",
  credential: true,
};

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/list", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  let calendar_id = req.query.calendar_id;
  let event_id = req.query.event_id;
  let query = "SELECT * FROM Events";

  if (calendar_id !== undefined) {
    query += ` WHERE (calendar_id='${calendar_id}'`;
    if (event_id !== undefined) {
      query += ` AND event_id='${event_id}'`;
    }
    query += ")";
  }

  db.query(query, (err, result) => {
    res.send(result);
  });
});

app.post("/insert", jsonParser, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let event_id = req.body.event_id;
  let calendar_id = req.body.calendar_id;
  let is_enabled = req.body.is_enabled;
  let address = req.body.address;
  let lat = req.body.lat;
  let lng = req.body.lng;
  let routes = req.body.routes;

  console.log(`INSERT ${event_id}`);

  const query =
    "INSERT INTO Events (is_enabled, event_id, calendar_id, address, lat, lng, routes) VALUES (?,?,?,?,?,?,?);";
  db.query(
    query,
    [is_enabled, event_id, calendar_id, address, lat, lng, routes],
    (err, result) => {
      res.send(result);
      console.log(err);
    }
  );
});

app.post("/update", jsonParser, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let is_enabled = req.body.is_enabled;
  let event_id = req.body.event_id;
  let calendar_id = req.body.calendar_id;
  let address = req.body.address;
  let lat = req.body.lat;
  let lng = req.body.lng;
  let routes = req.body.routes;

  const query =
    "UPDATE Events SET is_enabled = `?`, lat = `?`, lng = `?`, routes = `?`, address = `?` WHERE (calendar_id = `?` AND event_id = `?`);";
  db.query(
    query,
    [is_enabled, lat, lng, routes, address, calendar_id, event_id],
    (err, result) => {
      res.send(result);
    }
  );
});

async function doSomething() {
}

schedule.scheduleJob('30 * * * * *', async () => {
    doSomething();
});

doSomething();

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

