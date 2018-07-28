var expressSanitizer = require("express-sanitizer"),
    Blog             = require('../models/blogpost'),
    Comment          = require('../models/comment'),
    middleware       = require('../middleware'),
    express          = require('express'),
    router           = express.Router();
    
router.get("/", function(req, res){
   Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("index", {blogs: blogs});
       }
   });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            res.redirect("/posts");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("new"); 
});

router.get("/:id", function(req, res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err){
            res.redirect("/posts");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

router.get("/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/posts");
        } else {
            res.render("edit", {blog: foundBlog});     
        }
    });
});

router.put("/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/posts");
        } else {
            res.redirect("/posts/" + req.params.id);
        }
    });
});

router.delete("/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/posts");
        } else {
            res.redirect("/posts");
        }
    });
});

router.get("/:id/comments/new", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {blog: blog});
        }
    });
});

router.post("/:id/comments", function(req, res){
   Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
            res.redirect("/posts");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect("/posts/" + blog._id);
                }
            });
        }
   });
});

router.delete('/:id/comments/:comment_id', function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/posts/' + req.params.id);
        }
    });
});
module.exports = router;