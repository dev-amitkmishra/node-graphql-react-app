const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
    createUser: async function(args, req) {
        const { email, name, password } = args.userInput;
        const errors = [];
        if (!validator.isEmail(email)) {
            errors.push({message: "Invalid Email"});
        }
        if (validator.isEmpty(password) || !validator.isLength(password, { min: 5})) {
            errors.push({message: "Password too short!"});
        }
        if (errors.length > 0) {
            const error = new Error('Invalid input');
            error.data = errors;
            error.code = 432;
            throw error;
        }
        const existingUser = await User.findOne({email: email});
        if(existingUser) {
            const error = new Error('User exists already!');
            throw error;
        }

        const hashedPwd = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            name: name,
            password: hashedPwd
        });
        const createdUser = await user.save();
        return {
            ...createdUser._doc, _id: createdUser._id.toString()
        }
    },
    login: async function(args, req) {
        const { email, password } = args.loginInput;

        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                const error = new Error('No user found');
                error.statusCode = 401;
                throw error;
            }
            
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                const error = new Error('Incorrect password!');
                error.statusCode = 401;
                throw error;
            }
            
            const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            'secretcode',
            { expiresIn: '24h' }
            );
            return {
                userId: user._id.toString(), token: token, status: true
            }
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
        }
    },
    fetchUsers: async function(args, req) {
        const users = await User.find();
        if(!users) {
            const error = new Error('User exists already!');
            throw error;
        }
        return users;
    }
}