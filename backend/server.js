const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const knex = require("knex");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
var urlencodedParser = bodyParser.text({ type: "text/html" });

const db = knex({
  client: "pg",
  connection: {
    host: process.env.HOST,
    port: process.env.KNEX_PORT,
    user: "postgres",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    searchPath: ["knex", "public"],
  },
});

app.post("/getaccount", urlencodedParser, (req, res) => {
  db("bankaccounts")
    .where("accountnumber", req.body)
    .then((response) => res.json(response))
    .catch((err) => res.json("Account do not exist"));
});

app.post("/addaccount", (req, res) => {
  const { accountnumber, name, accounttype, balance, transactions } = req.body;

  db("bankaccounts")
    .returning("*")
    .insert({
      name,
      accountnumber,
      accounttype,
      balance,
      transactions,
    })
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

app.post("/updateaccount", urlencodedParser, (req, res) => {
  console.log(req.body);

  const { accountnumber, name, accounttype, balance, transactions } = req.body;

  db("bankaccounts")
    .where({ accountnumber, name })
    .update({ balance, transactions })
    .then((response) => res.json(response))
    .catch((err) => res.json("Account do not exist"));
});

app.listen(process.env.PORT, () =>
  console.log(`${process.env.PORT} connected successfully at ${new Date()}`)
);
