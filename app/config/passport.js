const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')
function init(passport){
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email: email });
                if (!user) {
                    return done(null, false, { message: 'No user with this email' });
                }

                const isPasswordValid = await user.verifyPassword(password);
                if (!isPasswordValid) {
                    return done(null, false, { message: 'Invalid password' });
                }
                 return done(null, user); } 
                 catch (err) {
                return done(err);
            }
        }
    )
);
            passport.serializeUser((user, done) => {
                done(null, user._id);
            });

            passport.deserializeUser(async (id, done) => {
                try {
                    const user = await User.findById(id);
                    done(null, user);
                } catch (err) {
                    done(err);
                }
            });
}
        module.exports = init;