const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique:true },
        email: { type: String, required: true },
        password:{ type: String, required: true },
        role:{ type: String, default: 'customer' }}, 
            { timestamps: true });

            userSchema.methods.verifyPassword = function (password) {
                // Simple plain text comparison
                return this.password === password;
            };
            
            const User = mongoose.model('User', userSchema);
            module.exports = User;