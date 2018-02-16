var Blog       = require('../models/blogpost'),
    express    = require('express'),
    router     = express.Router();
    
router.get("/january", function(req, res){
Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("montharchives/january", {blogs: blogs});
       }
   });
});

router.get("/february", function(req, res){
Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("montharchives/february", {blogs: blogs});
       }
   });
});

module.exports = router;