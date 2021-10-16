const express = require("express");
let date = require(__dirname+"/date.js");

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

let items = ["Classes","Lunch","Study","Anime"];
let workitems = [];

app.get("/",function(req,res){
    let day = date;
    res.render("list",{listTitle: day, newListItems: items});
});

app.post("/",function(req,res){
    let item =  req.body.newitem;
    if (req.body.list=== "Work"){
        workitems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    items.push(item);
    res.redirect("/");
})

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List", newListItems: workitems});
})

app.post("/work",function(req,res) {
    let item = req.body.newitem;
    workitems.push(item);
    res.redirect("/work");
})

app.get("/about",function(req,res){
    res.render("about");
})


app.listen(3000,function(){
    console.log("server 3000 is running");
})