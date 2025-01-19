import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    about:{
        type:String,
    },
    profilePicture:{
        type:String,
        default:"../../public/profile.png"
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    bio:{
        type:String,
    },
    country:{
        type:String,
    },
    college:{
        type:String,
    },
    degree:{
        type:String,
    },
    branch:{
        type:String,
    },
    yearOfGraduation:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    github:{
        type:String,
    },
    instagram:{
        type:String,
    },
    resume:{
        type:String,
    },
    leetcode:{
        type:String,
    },
    codeforces:{
        type:String,
    },
    codechef:{
        type:String,
    },
    geekforgeeks:{
        type:String,
    },
    // questions:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Post',
    // }

},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User; 