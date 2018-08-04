var Blog       = require('../models/blogpost'),
    express    = require('express'),
    router     = express.Router();
    
router.get("/december15", function(req, res){
Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("montharchives/december15", {blogs: blogs});
       }
   });
});

router.get("/november16", function(req, res){
Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("montharchives/november16", {blogs: blogs});
       }
   });
});

router.get("/march17", function(req, res){
Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("montharchives/march17", {blogs: blogs});
       }
   });
});

router.get("/april17", function(req, res){
Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("montharchives/april17", {blogs: blogs});
       }
   });
});

router.get("/june17", function(req, res){
Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("montharchives/june17", {blogs: blogs});
       }
   });
});

module.exports = router;