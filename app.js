var Blog             = require('./models/blogpost'),  
    categoryRoutes   = require('./routes/category'),
    expressSanitizer = require("express-sanitizer"),
    Comment          = require('./models/comment'),
    archiveRoutes    = require('./routes/archive'),
    methodOverride   = require('method-override'),
    LocalStrategy    = require('passport-local'),
    indexRoutes      = require('./routes/index'),
    User             = require('./models/user'),
    postRoutes       = require('./routes/post'),
    middleware       = require('./middleware'),
    bodyParser       = require('body-parser'),
    nodeMailer       = require('nodemailer'),
    passport         = require('passport'),
    mongoose         = require('mongoose'),
    request          = require('request'),
    express          = require('express'),
    request          = require("express"),
    router           = express.Router(),
    app              = express();

//==================================
//APP CONFIG
//==================================

// mongoose.connect("mongodb://localhost/amy_blog");
// mongoose.connect('mongodb://amyhart23:maem2501@ds231588.mlab.com:31588/hart_to_hearts');
mongoose.connect(process.env.DATABASEURL);    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: 'I am cool',
    resave: false,
    saveUninitialized: false
}));

// app.use(expressSanitizer());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(express.static(__dirname + "/public"));

app.use('/', indexRoutes);
app.use('/posts', postRoutes);
app.use('/categories', categoryRoutes);
app.use('/montharchives', archiveRoutes);

//==================================
//CONTACT PAGE FUNCTIONALITY
//==================================
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

//==================================
//PORT AND IP SETUP
//==================================

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("================================");
    console.log("The Blog server has started!");
    console.log("================================");
});