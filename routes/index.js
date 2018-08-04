var Blog       = require('../models/blogpost'),
    User       = require('../models/user'),
    passport   = require('passport'),
    express    = require('express'),
    router     = express.Router();


router.get("/", function(req, res){
     Blog.find({}, function(err, blogs){
      if(err){
          console.log(err);
      } else {
          res.render("index", {blogs: blogs});
      }
  });
});

// router.get('/register', function(req, res){
//     res.render('register');
// });

// router.post('/register', function(req, res){
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

router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login', passport.authenticate('local', 
    {
        successRedirect: 'posts', 
        failureRedirect: 'login'
    }), function(req, res){
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/about', function(req, res){
    res.render('about');
});

router.get('/contact', function(req, res){
    res.render('contact');
});

module.exports = router;