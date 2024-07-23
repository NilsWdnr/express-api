const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUser = async (req,res) => {
    try {
        const { id } = req.params;
        const user =  await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUsers = async (req,res) => {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
}

const createUser = async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;

        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const loginUser = async (req,res) => {
    try {
        if(req.body.email===undefined||req.body.password===undefined){
            return res.status(400).json({message: 'Please provide email and password.'})
        }

        const user = await User.findOne({email: req.body.email});
        if(user===null){
            return res.status(400).json({message: 'User or password incorrect.'});
        }
        
        const passwordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(passwordCorrect){
            const token = authenticateUser(user);
            res.status(200).json({accessToken: token});
        } else {
            return res.status(400).json({message: 'User or password incorrect.'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const authenticateUser = (user) => {
    const data = {
        id: user.id,
        name: user.name,
    }

    return jwt.sign(data,process.env.TOKEN_SECRET,{expiresIn: '4h'});
}

const updateUser = async (req,res) => {
    try {
        const { id } = req.params;
        const newUser = await User.findByIdAndUpdate(id,req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteUser = async (req,res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted!"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}