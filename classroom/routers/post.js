const express = require("express")
const router = express.Router();



// Index - post
router.get("/", (req, res)=>{
    res.send("GET for posts")
})

// show - posts
router.get("/:id", (req, res) =>{
    res.send("GET for show posts")
})

// Post - posts
router.post("/", (req, res)=>{
    res.send("post for posts");
})

// DELETE - posts 
router.delete("/:id", (req, res)=>{
    res.send("DETELE FOR POST:ID");
})

module.exports = router;