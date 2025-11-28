
const express = require("express");
const app = express();
const users = require("./routers/user.js");
const posts = require("./routers/post.js");

app.use("/users", users);
app.use("/posts", posts);


app.get("/", (req, res)=>{
    res.send("Hi, I am root!");
})


app.listen(3000, ()=>{
    console.log("server is listening to 3000");
})


