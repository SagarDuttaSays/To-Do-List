const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//var arr = [];

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/toDoList");

const schema = new mongoose.Schema({
    name: String
});

const item = new mongoose.model("task", schema);

app.get("/", function(req,res){
    item.find().then(function(data){
        res.render("list",{arr: data})
    }).catch(function(err){
        console.log(err);
    })
    
});
app.post("/", function(req,res){
    var task = req.body.input;
    const toDoTask = new item({
        name: task
    });
    toDoTask.save();
    res.redirect("/");
});

app.post("/delete", function(req, res){
    console.log('reached');
    const taskId = req.body.checkbox1;
    item.findByIdAndRemove(taskId).then(function(){
            console.log('deleted!');
            res.redirect("/");
    }).catch(function(err){
        console.log(err);
    })
    
})

app.listen(8000, function(){
    console.log("server started!");
});