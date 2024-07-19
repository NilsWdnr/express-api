const Post = require('../models/Post');

const getAllPosts = async (req,res) => {
    try {
        if(req.query.tags!==undefined){
            const tagsArray = req.query.tags.split(',');
            const posts = await Post.find({tags: {$all: tagsArray}}).populate('author','name');
            res.status(200).json(posts);
        } else {
            const posts = await Post.find({}).populate('author','name');
            res.status(200).json(posts);
        }
    } catch(error) {
        res.status(404).json({message: error.message})
    }
} 

const getPost = async (req,res) => {
    try {
        const {id} = req.params;
        const postResult = await Post.findById(id);
        res.status(200).json(postResult);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const createPost = async (req,res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updatePost = async (req,res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndUpdate(id,req.body);
        updatedPost =  await Post.findById(id);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deletePost = async (req,res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.status(200).json({message: 'Post deleted!'});
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const getByAuthor = async (req,res) => {
    try {
        const {id} = req.params;
        const postResults = await Post.find({author: id});
        res.status(200).json(postResults);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

module.exports = {
    getAllPosts,
    getPost,
    createPost ,
    getByAuthor,
    updatePost,
    deletePost
}