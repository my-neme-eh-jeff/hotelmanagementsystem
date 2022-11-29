const express = require("express");
const User = require("./db/userSchema");
const router = new express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authenicicate = require("./middleware/authenicication");
const { Navigate } = require("react-router-dom");

router.post("/signup", async (req, res) => {
  const { username, email, password, phonenumber, role } = req.body;
  const userExist = await User.findOne({ username: username });
  const emailExist = await User.findOne({ email: email })
  try {
    if (userExist) {
      return res.status(422).json({ error: "username is already taken" });
    }
    if (emailExist) {
      return res.status(422).json({ error: "account exists for the email" })
    }
    const data = new User({ username, email, password, phonenumber, role });
    await data.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err })
    console.log(err)
  }
});


router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body

    const userToBeChecked = await User.findOne({ username: username })
    const emailToBeChecked = await User.findOne({ email: username })
    if (!userToBeChecked && !(emailToBeChecked)) {
      res.status(404).json({ error: "No user exists" })
    }
    else if (userToBeChecked) {
      const passwordMatchOrNot = await bcrypt.compare(password, userToBeChecked.password)
      if (passwordMatchOrNot) {
        const token = await userToBeChecked.generateAuthToken();
        res.cookie("jsonwebtoken", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true
        })
        return res.status(200).json({ message: "Login successfully", role: userToBeChecked.role })
      }
      else res.status(404).json({ message: "Password did not match" })
    } else {
      const passwordMatchOrNot = await bcrypt.compare(password, emailToBeChecked.password)
      if (passwordMatchOrNot) {
        const token = await emailToBeChecked.generateAuthToken();
        res.cookie("jsonwebtoken", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true
        })
        return res.status(200).json({ message: "Login successfully", role: emailToBeChecked.role })
      }
      else res.status(404).json({ message: "Password did not match" })
    }
  } catch (err) {
    console.log(err)
  }
});

router.post("/auth", async (req, res) => {
  try {
    console.log("1")
    if (req.body.email_verified == false) {
      return res.status(401).json({ message: "gmail id not verified" })
    }
    const userToBeChecked = await User.findOne({ email: req.body.email })
    if (userToBeChecked) {
      const token = await userToBeChecked.generateAuthToken();
      res.cookie("jsonwebtoken", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true
      })
      return res.status(200).json({ message: "Login successfully", role: userToBeChecked.role })
    } else {
      res.status(404).json({ message: "signup" })
    }
  } catch (err) {
    console.log(err)
  }
})

router.get("/AdminPage", authenicicate, (req, res) => {
  res.send(req.userData)
})

router.get("/HostPage", authenicicate, (req, res) => {
  res.send(req.userData)
})

router.get("/UserPage", authenicicate, (req, res) => {
  res.send(req.userData)
})

router.get("/Logout", (req, res) => {
  res.clearCookie("jsonwebtoken", { path: "/" })
  res.status(200).send("user logged out")
})

module.exports = router;
