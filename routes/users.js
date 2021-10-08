if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const user = await User.find({
      username: req.body.username,
      password: req.body.password,
    }).exec();
    res.status(200).json({
      accessToken: jwt.sign(
        { name: req.body.username },
        process.env.ACCESS_TOKEN_SECRET
      ),
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split[" "][1];
  if (token == null) res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

router.post("/", authenticateToken, async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.send(user);
    user
      .save()
      .then((data) => res.status(200))
      .catch((err) => res.json({ msg: err }));
  } catch (error) {}
});

module.exports = router;
