const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mypassword",
    database: "Events",
});

// app.get("/", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     const sqlQuery = "INSERT INTO requested (rowno) VALUES (1)";
//     db.query(sqlQuery, (err, result) => {
//         console.log(err);
//         res.send("success!");
//     });
// });

app.get("/list", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT * FROM Events";
    db.query(sqlQuery, (err, result) => {
       res.send(result);
    });
});

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});
