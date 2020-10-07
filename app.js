/**
 * Here, we will sync our database, create our application, and export this
 * module so that we can use it in the bin directory, where we will be able to
 * establish a server to listen and handle requests and responses;
 */

// Load environmental variables from .env file
require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./authorize");
const apiRouter = require("./routes");
const cors = require("cors");



// Utilities;
const createLocalDatabase = require("./utils/createLocalDatabase");
const seedDatabase = require("./utils/seedDatabase");

// Our database instance;
const db = require("./database");

//AJ's code...(initalize sequelize with session store)
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SequelizeStore({db});

// A helper function to sync our database;
const syncDatabase = () => {
  if (process.env.NODE_ENV === "production") {
    db.sync();
  } else {
    console.log("As a reminder, the forced synchronization option is on");
    db.sync({ force: true })      
      .then(() => seedDatabase())
      .catch((err) => {
        if (err.name === "SequelizeConnectionError") {
          createLocalDatabase();
          seedDatabase();
        } else {
          console.log(err);
        }
      });
  }
};

// Instantiate our express application;
const app = express();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  }
  catch (err) {
    done(err);
  }
});

// A helper function to create our app with configurations and middleware;
const configureApp = () => {
  app.use(helmet());
  app.use(logger("dev"));
  // handle request data:
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
  app.use(cookieParser());
  app.use(cors({ credentials: true, origin: 'https://eco-carrot.web.app' }))

  // Our apiRouter
  const apiRouter = require("./routes/index");

  // Mount our apiRouter
  app.use("/api", apiRouter);
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/auth", authRouter);

  // Error handling;
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error("Not found");
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

///**from AJS code....need to reconcile app.use above**
  app.use(
    session({
      secret: "a super secretive secret key string to encrypt and sign the cookie",
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  );

  // More error handling;
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

// Main function declaration;
const bootApp = async () => {
  await syncDatabase();
  await configureApp();
  await sessionStore.sync();
  //await startListening();

};

// Main function invocation;
bootApp();

// Export our app, so that it can be imported in the www file;
module.exports = app;
