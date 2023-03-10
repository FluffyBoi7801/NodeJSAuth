const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'});
}

class authController {
    async reg(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Registration error!', errors});
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: `User with same username already exists!`});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'});
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await  user.save();
            return res.status(200).json({message: 'Successfully registered!'});
        } catch (e) {
            console.log(`Error in getUsers by ${e}`);
            res.status(400).json({message: `Registration error`});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json({message: `User: ${username} don't exists`});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: `Password for user: ${username} doesn't match`});
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token});
        } catch (e) {
            console.log(`Error in getUsers by ${e}`);
            res.status(400).json({message: `Login error`});
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(`Error in getUsers by ${e}`);
            res.status(400).json({message: `Getting users error`});
        }
    }
}

module.exports = new authController();