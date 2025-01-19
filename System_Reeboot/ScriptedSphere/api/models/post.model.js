import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    content:{
        type:String,
    },
    title:{
        type:String,
        required:true,
    },
    youtube:{
        type:String,
    },
    question:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        required:true,
    },
    platform:{
        type:String,
        required:true,
    },
    topic:{
        type:String,
    },
},{timestamps:true});

const Post = mongoose.model('Post',PostSchema);

export default Post;