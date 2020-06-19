const express = require("express");
const router = express.Router();
const { Users } = require("../database/models");

//auth/signup
router.post("/signup", async (req, res, next) => {
    try {
      const user = await Users.create(req.body);
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
    catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(401).send("User already exists");
      }
      else {
        next(err);
      }
    }
  });

  //auth/login
router.post("/login", async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(401).send("Wrong username and/or password");
    }
    else if (!user.correctPassword(req.body.password)) {
      res.status(401).send("Wrong username and/or password");
    }
    else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  }
  catch (err) {
    next(err);
  }
});

//auth/
router.delete("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    else {
      res.status(204).end();
    }
  });
});

//auth/
router.get("/me", (req, res) => {
  res.json(req.user);
});

module.exports = router;