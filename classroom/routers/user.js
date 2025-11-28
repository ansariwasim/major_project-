const express = require("express")
const router = express.Router();

// Index - users
router.get("/", (req, res)=>{
    res.send("GET for Users")
})

// show - users
router.get("/:id", (req, res) =>{
    res.send("GET for show users")
})

// Post - users
router.post("/", (req, res)=>{
    res.send("post for users");
})

// DELETE - USERS 
router.delete("/:id", (req, res)=>{
    res.send("DETELE FOR USER:ID");
})

module.exports = router;