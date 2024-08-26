const express = require("express");
const path = require("node:path");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

const passport = require("passport");

require("dotenv").config();

const indexRouter = require("./routes/index");

const app = express();

//setup view engines
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//setup session store
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

//setup passport
require("./utils/passportConfig");

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  //make it so that ejs can access user object without having to manually pass it in
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(3000, () => console.log("app listening on port 3000!"));
