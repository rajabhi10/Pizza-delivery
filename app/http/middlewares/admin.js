function admin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        // If user is authenticated and has 'admin' role, proceed
        next();
    } else {
        // If not authenticated or not an 'admin', redirect to root path
        res.redirect('/');
    } 
}

module.exports = admin;
