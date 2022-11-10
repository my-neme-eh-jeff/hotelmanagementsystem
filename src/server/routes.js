const express = require("express");
const User = require("./db/userSchema");
const router = new express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, phonenumber, role} = req.body;
  const userExist = await User.findOne({ username: username });
  try {
    if (userExist) {
      return res.status(422).json({ error: "username is already taken" });
    }
    const data = new User({ username, password, phonenumber,role });

    await data.save();
    res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
    res.status(500).json({error:"Failed to save due to database error"})
  }
});

router.post("/login", async (req, res) => {
    try{    
        const {username,password} = req.body

    }catch(err){
        console.log(err)
    }
});

module.exports = router;
