const { response } = require("express");
const express = require("express");

const router = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
router.route("/main").get(async (req, res) => {
  let db_connect = dbo.getDb();
  db_connect
    .collection("Employees")
    .find({})
    .toArray()
    .then((data) => {
      res.json(data);
    });
});

// // This section will help you get a single record by id
router.route("/edit/:id").get(async (req, res) => {
  let db_connect = dbo.getDb();
  const myquery = { _id: new ObjectId(req.params.id) };

  db_connect
    .collection("Employees")
    .findOne(myquery)
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// // This section will help you create a new record.
router.route("/create").post(async (req, res) => {
  let myquery = {
    name: req.body.name,
    lastName: req.body.lastName,
    position: req.body.position,
    dateOfBirth: req.body.dateOfBirth,
    hobbies: req.body.hobbies,
  };
  let db_connect = dbo.getDb();
  db_connect.collection("Employees").insertOne(myquery);
  res.sendStatus(200);
});

// // This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      name: req.body.name,
      lastName: req.body.lastName,
      position: req.body.position,
      dateOfBirth: req.body.dateOfBirth,
      hobbies: req.body.hobbies,
    },
  };
  let db_connect = dbo.getDb();
  let result = db_connect.collection("Employees").updateOne(query, updates);
  res.send(result).status(200);
});

// // This section will help you delete a record
router.route("/:id").delete(async (req, res) => {
  let db_connect = dbo.getDb();
  const myquery = { _id: new ObjectId(req.params.id) };
  let result = db_connect.collection("Employees").deleteOne(myquery);
  res.send(result).status(200);
});

router.route("/detail/:id").get(async (req, res) => {
  let db_connect = dbo.getDb();
  const myquery = { _id: new ObjectId(req.params.id) };

  db_connect
    .collection("Employees")
    .findOne(myquery)
    .then((data) => {
      res.json(data);
    });
});
module.exports = router;
