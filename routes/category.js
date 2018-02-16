var Blog       = require('../models/blogpost'),
    express    = require('express'),
    router     = express.Router();
    
router.get('/motherhood', function(req, res){
    Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("categories/motherhood", {blogs: blogs});
       }
   });
});

router.get('/interiorstyle', function(req, res){
    Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("categories/interiorstyle", {blogs: blogs});
       }
   });
});

router.get('/wellness', function(req, res){
       Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("categories/wellness", {blogs: blogs});
       }
   });
});

router.get('/archive', function(req, res){
    Blog.find({}, function(err, blogs){
   if(err){
       console.log(err);
   } else {
       res.render("categories/archive", {blogs: blogs});
   }
    });
});

module.exports = router;