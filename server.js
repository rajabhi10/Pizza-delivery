const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const port = process.env.PORT || 3000;
app.use(express.static('public'))

// set Template engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');
    
//Assests
app.get('/', (req, res) => {
    res.render('home');
})
app.get('/cart', (req, res) => {
    res.render('customer/cart');
})
app.get('/login', (req, res) => {
    res.render('auth/login');
})
app.get('/register', (req, res) => {
    res.render('auth/register');
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
