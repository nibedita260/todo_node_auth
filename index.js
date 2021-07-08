const express=require('express');
const routes=require('./controllers/routes');

const mongoose=require('mongoose');
const path = require('path')
const uri=require('./config/mongoURI');

const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')

const dotenv = require('dotenv')

require('dotenv').config()
dotenv.config({ path:uri})

const app=express();

app.use(express.urlencoded({extended:true},),);
app.use(express.static('public'))


app.set('view engine','ejs');
app.set('views',__dirname+'/views');


//connect to mongodb
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
.then(()=>console.log("Connected!!"))
.catch(err=>{console.log(err)});

// Passport config
require('./config/passport')(passport);



app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: uri})
    })
  );

  

app.use(passport.initialize())
app.use(passport.session())

app.use(require("./controllers/index"))
app.use('/auth', require('./controllers/auth'))
app.use(require("./controllers/routes"))


app.get('/auth/google/callback',
  passport.authenticate('google'), // complete the authenticate using the google strategy
  (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
    if (err.name === 'TokenError') {
     res.redirect('/auth/google'); // redirect them back to the login page
    } else {
     // Handle other errors here
    }
  },
  (req, res) => { // On success, redirect back to '/'
    res.redirect('/');
  }
);

const PORT=process.env.PORT||4418;
app.listen(PORT,()=>console.log("Started on PORT:"+PORT,),);