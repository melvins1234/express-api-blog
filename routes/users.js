if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../config/authenticateToken");

const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    if (req.body.username == "" || req.body.password == "") throw new Error();

    const user = await User.find({
      username: req.body.username,
      password: req.body.password,
    }).exec();

    if (user.length === 0) throw new Error();

    const userJWT = { name: req.body.username };

    res.status(200).json({
      accessToken: generateAccessToken(userJWT),
      refreshToken: jwt.sign(userJWT, process.env.REFRESH_TOKEN_SECRET),
    });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Please provide a valid email address and password." });
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

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
