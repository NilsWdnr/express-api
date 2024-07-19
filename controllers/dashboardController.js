const Post = require('../models/Post');
const User = require('../models/User');

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
    } catch (error) {
        res.status(500).json({message: error.message});

    }
}

module.exports = {
    index,
    createPost,
    savePost,
    login
}