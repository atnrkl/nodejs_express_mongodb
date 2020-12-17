const router = require("express").Router();
const { model } = require("../models/User");
const User = require("../models/User");
const bcry = require("bcrypt");

const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await registerValidation.validateAsync(req.body);
  } catch (error) {
    if (error) return res.send(error.details[0].message);
  }

  //if Email and Username exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.json("email-already-exists");

  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists) return res.json("username-is-taken");

  const salt = await bcry.genSalt(10);
  const hashedPw = await bcry.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    nameSurname: req.body.nameSurname,
    email: req.body.email,
    cellNo: req.body.cellNo,
    password: hashedPw,
  });

  try {
    const savedUser = await user.save();
  } catch (error) {
    res.status(400).json(error);
  }

  next();
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await loginValidation.validateAsync(req.body);
  } catch (error) {
    if (error) return res.status(400).send(error.details[0].message);
  }

  //check username/email
  let username = await User.findOne({ username: req.body.username });
  if (!username) username = await User.findOne({ email: req.body.username });
  if (!username) return res.status(400).json("username is wrong");

  //check password
  const pw = await bcry.compareSync(req.body.password, username.password);
  if (!pw) return res.status(400).json("password is wrong");

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("auth-token", token).send(token);

  res.json("logged in");
});

module.exports = router;
