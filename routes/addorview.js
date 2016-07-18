var express=require("express");
var router=express.Router();
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/test");

var movieInfo=require("../models/movie");

router.post("/add",function(req,res){
  var data=new movieInfo(req.body);
  data.save(function(err,d){
    if(d)
    res.send(d);
    else {
      res.send(err);
    }
  });
});

router.get("/",function(req,res){
  movieInfo.find({},function(err,d){
    res.send(d);
  });
});

router.get("/byname-:name",function(req,res){
  var x=req.params.name;
  movieInfo.find({Title:{$regex:x}},function(err,d){
    if(d[0])
    res.send(d);
    else {
      res.send("No Movies Found");
    }
  });
});

router.delete("/delbyname-:name",function(req,res){
  movieInfo.remove({Title:req.params.name},function(err,data){
    if(data)
    res.send("deleted");
    else {
      res.send("Error");
    }
  });
});

router.delete("/delbyid-:id",function(req,res){
  movieInfo.remove({imdbID:req.params.id},function(){
    res.send("deleted");
  });
});

router.put("/updatebyname-:name",function(req,res){
  movieInfo.update({Title:req.params.name},req.body,function(){
    res.send("updated");
  });
});

router.get("/byid-:id",function(req,res){
  movieInfo.find({_id:req.params.id},function(err,d){
    res.send(d);
  });
});
module.exports=router;
