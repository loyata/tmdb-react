import mongoose from "mongoose";

const postSchema = mongoose.Schema({
        title: String,
        message: String,
        creator: {
            type:String,
            required:true
        },
        name: String,
        tags:[String],
        selectedFile: String,
        likes: {
            type:[String],
            default: []
        },
        createdAt: {
            type: Date,
            default: new Date()
        },
        comments: {
            type:[String],
            default: []
        },
    }
);

export default mongoose.model('PostMessage', postSchema);