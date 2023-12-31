    require('dotenv').config();
    const express = require('express');
    const app = express();
    const ejs = require('ejs');
    const path = require('path');
    const expressLayouts = require('express-ejs-layouts');
    const port = process.env.PORT || 3000;
    const mongoose = require('mongoose');
    const session = require('express-session');
    const flash = require('express-flash');
    const MongoStore = require('connect-mongo')(session);
    const passport = require('passport');
  

    // Database Connection
    
    mongoose.connect('mongodb://127.0.0.1:27017/Pizza', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const connection = mongoose.connection;
   connection.once('open', () => {
        console.log('Database connected...');
      });
    connection.on('error', (err) => {
      console.error('Connection failed...', err);
    });
    
         //Session Store
         const dbConnection = mongoose.connection;
         const mongoStore = new MongoStore({
           mongooseConnection: dbConnection,
           collection: 'sessions',
         });

           // Session Config
        app.use(session({
          secret: process.env.COOKIE_SECRET,
          resave: false,
          store: mongoStore,
          saveUninitialized: false,
          cookie: { maxAge: 1000 * 60 * 60 * 24 } // Equal to 24 hours matlb jo bhi cookie create hoga ek session me vo 24hrs ke liye valid rhega
        }));

    // Passport config
    const passportInit = require('./app/config/passport')
    passportInit(passport)
    app.use(passport.initialize());
    app.use(passport.session());

     app.use(flash());
      

    //  Assests
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

    // Global Middleware
    app.use((req, res, next) => {
        res.locals.session = req.session 
        res.locals.user = req.user
        next()
    })


    // set Template engine
    app.use(expressLayouts);
    app.set('views', path.join(__dirname, '/resources/views'));
    app.set('view engine', 'ejs');
        
    // Importing Routes
        require('./routes/web')(app);
        app.use((req,res) => {
          res.status(404).send('<h1>404, Page Not Found</h1>')
        })

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
      
  
