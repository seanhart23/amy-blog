var expressSanitizer = require("express-sanitizer"),
    methodOverride   = require('method-override'),
    LocalStrategy    = require('passport-local'),
    bodyParser       = require('body-parser'),
    passport         = require('passport'),
    mongoose         = require('mongoose'),
    express          = require('express'),
    request          = require("express"),
    router           = express.Router(),
    User             = require('./models/user'),
    middleware       = require('./middleware'),
    app              = express();
    
var request          = require('request');

//APP CONFIG
mongoose.connect("mongodb://localhost/amy_blog");
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

//MONGOOSE MODEL/CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    category1: String,
    category2: String,
    category3: String,
    body:  String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/posts");
});

app.get('/motherhood', function(req, res){
    res.render('motherhood');
});

app.get('/interiorstyle', function(req, res){
    res.render('interiorstyle');
});

app.get('/wellness', function(req, res){
    res.render('wellness');
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.get('/archive', function(req, res){
    res.render('archive');
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
   res.render("new") 
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

//SHOW ROUTE
app.get("/posts/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
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

app.get('/register', function(req, res){
    res.render('register');
});

app.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/posts');
        });
    });
});

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

//TELL APP TO LISTEN TO PORT AND IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("================================");
    console.log("The Blog server has started!");
    console.log("================================");
});