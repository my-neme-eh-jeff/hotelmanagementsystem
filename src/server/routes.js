const express = require("express");
const User = require("./db/userSchema");
const router = new express.Router();
const bcrypt = require("bcrypt")

router.post("/signup", async (req, res) => {
  const { username, password, phonenumber, role} = req.body;
  const userExist = await User.findOne({ username: username });
  try {
    if (userExist) {
      console.log("user exist vala part")
      return res.status(422).json({ error: "username is already taken" });
    }
    const data = new User({ username, password, phonenumber,role });
    await data.save();

    res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
    res.status(500).json({error:err})
  }
});

router.post("/", async (req, res) => {
    try{    
        const {username,password} = req.body
        
        const userToBeChecked = await User.findOne({username:username})
        if(!userToBeChecked){
          res.status(404).json({error:"No user exists"})
        }else{
            const passwordMatchOrNot = await bcrypt.compare(password,userToBeChecked.password)
            if(passwordMatchOrNot) return res.status(200).json({message:"Login successfully" , role:userToBeChecked.role})
            else res.status(404).json({message:"Password did not match"})
        }
    }catch(err){
        console.log(err)
    }
});
 


module.exports = router;
