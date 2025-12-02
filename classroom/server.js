const express = require("express");
const app = express();
const users = require("./routers/user.js");
const posts = require("./routers/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const Path = require("path");

app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "views"));

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next)=>{
    res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
})

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;

  if (name === "anonymous") {
    req.flash("error", "User are not registered!");
  } else {
    req.flash("success", "user registered successful!");
  }
  req.session.name = name;
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {

  res.render("page.ejs", { name: req.session.name });
});

// app.get("/reqcount", (req,res)=>{

//     if(req.session.count){
//         req.session.count++
//     }else{
//         req.session.count = 1;
//     }

//     res.send(`You sent a request ${req.session.count} times`);
// })

app.listen(3000, () => {
  console.log("server is listening to 3000");
});
