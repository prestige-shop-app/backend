const express = require("express");
const router = express.Router();
const Drivers = require("../Models/Collection.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verify = require("./VerificationToken.js");

dotenv.config();

router.get("/", async (req, res) => {
  await Drivers.findAll().then((drivers) => res.json(drivers));
});

router.get("/:id", async (req, res) => {
  await Drivers.findByPk(req.params.id).then((drivers) => res.json(drivers));
});

router.post("/register", async (req, res) => {
  const emailExist = await Drivers.findOne({
    where: { email: req.body.email },
  });
  if (emailExist) return res.status(400).send("Email already exist");
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  await Drivers.create({
    firstName: req.body.Fname,
    lastName: req.body.Lname,
    password: hashPassword,
    email: req.body.email,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    card_id: req.body.card_id,
    drive_license: req.body.drive_license,
    lat: req.body.lat,
    lon: req.body.lon,
    imgUrl: req.body.imgUrl,
  }).then((user) => res.json(user));
});
router.post("/login", async (req, res) => {
  const user = await Drivers.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send("Email is not found");
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password ");
  const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
  res.header("auth_token", token).send(token);
});

router.put("/:id", async (req, res) => {
  Drivers.findByPk(req.params.id).then((drivers) => {
    drivers
      .update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        card_id: req.body.card_id,
        drive_license: req.body.drive_license,
        lat: req.body.lat,
        lon: req.body.lon,
        imgUrl: req.body.imgUrl,
      })
      .then((drivers) => {
        res.json(drivers);
      });
  });
});

router.delete("/:id", async (req, res) => {
  await Drivers.findByPk(req.params.id)
    .then((drivers) => {
      Drivers.destroy();
    })
    .then(() => {
      res.json("deleted");
    });
});

router.delete("/", async (req, res) => {
  await Drivers.destroy({ where: {}, truncate: true }).then(() =>
    res.json("cleared")
  );
});

module.exports = router;
