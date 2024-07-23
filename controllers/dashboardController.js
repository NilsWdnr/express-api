const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const index = async (req,res) => {
    try {
        const posts = await Post.find({}).populate('author','name');
        res.render('dashboard', {
            title: 'Dashboard',
            posts,
            query: req.query
        });
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

const createPost = async (req,res) => {
    const users = await User.find({});
    res.render('createPost', {
        title: 'Create Post',
        authors: users
    })
}

const savePost = async (req,res) => {
    try {
        await Post.create(req.body);
        res.redirect('/dashboard?message=post_created');
    } catch (error) {
        //todo: catch error
    }
}

const login = async (req,res) => {
    try {
        res.render('login', {
            title: 'Login',
        })
        console.log(req.body);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const validateLogin = async (req,res) => {
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

module.exports = {
    index,
    createPost,
    savePost,
    login,
    validateLogin
}