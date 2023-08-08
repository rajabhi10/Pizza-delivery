const User = require('../../models/user');
const passport = require('passport');

function authController(){
    return{
        login(req, res){
            res.render('auth/login');
        },
        postLogin(req, res, next) {
            passport.authenticate('local', async (err, user, info) => {
                try {
                    if (err) {
                        return next(err);
                    }

                    if (!user) {
                        req.flash('error', 'Invalid email or password.');
                        return res.redirect('/login');
                    }

                    req.logIn(user, (err) => {
                        if (err) {
                            req.flash('error', 'Failed to log in.');
                            return next(err);
                        }

                        return res.redirect('/');
                    });
                } catch (err) {
                    req.flash('error', 'Something went wrong.');
                    return res.redirect('/login');
                }
            })(req, res, next);
        },
        register(req, res){
            res.render('auth/register');
        },
        async postRegister(req, res){
            const { username, email, password } = req.body;
            
        //     Validate Request
            if(!username || !email || !password){ 
                return res.redirect('/register');
            }
                // Check if email exists
                try{
                 const userExists = await User.exists({ username: username});
                    if(userExists){
                        req.flash('error', 'Username already taken');
                        req.flash('name', username);
                        return res.redirect('/register');
                }
            } catch(err) {
                req.flash('error', 'Something went wrong');
                return res.redirect('/register');
            }

            // Create a user
            const user = new User({
                username,
                email,
                password: password
            })
            try {
                const savedUser = await user.save();
                req.flash('success', 'Registration successful. You can now log in.');
                return res.redirect('/');
            } catch (err) {
                req.flash('error', 'Something went wrong.');
                return res.redirect('/register');
            }
        },
        logout(req, res) {
            req.logout(function(err) {
                if (err) { return next(err); }
            res.redirect('/login');
       });
    }}
}
module.exports = authController;