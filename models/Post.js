const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { getCurrentDate } = require('../helpers/date');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: Array,
        required: false 
    },
    created: {
        type: String,
        required: true,
        default: getCurrentDate()
    }

})

const Post = mongoose.model("Post",PostSchema);
module.exports = Post;