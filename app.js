var expressSanitizer = require("express-sanitizer"),
    methodOverride   = require('method-override'),
    LocalStrategy    = require('passport-local'),
    bodyParser       = require('body-parser'),
    nodeMailer       = require('nodemailer'),
    passport         = require('passport'),
    mongoose         = require('mongoose'),
    express          = require('express'),
    request          = require("express"),
    router           = express.Router(),
    User             = require('./models/user'),
    Blog             = require('./models/blogpost'),  
    Comment          = require('./models/comment'),  
    middleware       = require('./middleware'),
    app              = express();

var request          = require('request');

//APP CONFIG
// mongoose.connect("mongodb://localhost/amy_blog");
mongoose.connect('mongodb://amyhart23:maem2501@ds231588.mlab.com:31588/hart_to_hearts');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: 'I am cool',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/posts");
});

app.get('/categories/motherhood', function(req, res){
    Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("categories/motherhood", {blogs: blogs});
       }
   });
});

app.get('/categories/interiorstyle', function(req, res){
    Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("categories/interiorstyle", {blogs: blogs});
       }
   });
});

app.get('/categories/wellness', function(req, res){
       Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("categories/wellness", {blogs: blogs});
       }
   });
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.get('/categories/archive', function(req, res){
    Blog.find({}, function(err, blogs){
   if(err){
       console.log(err);
   } else {
       res.render("categories/archive", {blogs: blogs});
   }
    });
});

app.get("/posts", function(req, res){
   Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("index", {blogs: blogs});
       }
   });
});

app.get("/posts/new", middleware.isLoggedIn, function(req, res){
   res.render("new"); 
});

//CREATE ROUTE
app.post("/posts", middleware.isLoggedIn, function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            res.redirect("/posts");
        }
    });
});

app.post("/posts", middleware.isLoggedIn, function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            res.redirect("/posts");
        }
    });
});

//SHOW ROUTE
app.get("/posts/:id", function(req, res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err){
            res.redirect("/posts");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/posts/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/posts");
        } else {
            res.render("edit", {blog: foundBlog});     
        }
    });
});

//UPDATE ROUTE
app.put("/posts/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/posts");
        } else {
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/posts/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/posts");
        } else {
            res.redirect("/posts");
        }
    });
});

// app.get('/register', function(req, res){
//     res.render('register');
// });

// app.post('/register', function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.render('register');
//         }
//         passport.authenticate('local')(req, res, function(){
//             res.redirect('/posts');
//         });
//     });
// });

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', passport.authenticate('local', 
    {
        successRedirect: 'posts', 
        failureRedirect: 'login'
    }), function(req, res){
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//EMAIL SETUP
var port = 3000;
    app.post('/send-email', function (req, res) {
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'seanhart23@gmail.com',
              pass: 'omcmozfdzkhkyzif'
          }
      });
          var body = req.body.body;
          var name = req.body.name;
          var email = req.body.email;
          var subject = req.body.subject;
          
      let mailOptions = {
          from: name + '<seanhart23@gmail.com>', // sender address
          to: '<seanhart23@gmail.com>, <hart.amylynn@gmail.com>',
          subject: "Message from Hart to Hearts: " + subject,
          html: "<b>Name: </b>" + name + "<p><b>E-mail Address: </b>" + email + "<p><b>Message: </b>" + body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('contactSuccess');
          });
      });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });

//COMMENTS

app.get("/posts/:id/comments/new", function(req, res){
    //FIND CAMPGROUND PAGE BY USING THE ID
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {blog: blog});
        }
    });
});

app.post("/posts/:id/comments", function(req, res){
   //LOOKUP CAMPGROUND USING ID
   Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
            res.redirect("/posts")
        } else {
    //CREATE NEW COMMENT
    console.log(req.body.comment)
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
    //CONNECT THE NEW COMMENT TO CAMPGROUND
                    blog.comments.push(comment);
                    blog.save();
    //REDIRECT TO CAMPGROUND SHOW PAGE
                    res.redirect("/posts/" + blog._id);
                }
            });
        }
   });
});

//COMMENT DESTROY ROUTE
app.delete('/posts/:id/comments/:comment_id', function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/posts/' + req.params.id);
        }
    });
});
//TELL APP TO LISTEN TO PORT AND IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("================================");
    console.log("The Blog server has started!");
    console.log("================================");
});