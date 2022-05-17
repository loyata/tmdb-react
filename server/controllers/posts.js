import PostMessage from '../models/posts.js'
import mongoose from "mongoose";


export const getPosts = async (req, res) => {
    const { page } = req.query;
    //console.log(page)
    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({id: -1}).limit(LIMIT).skip(startIndex);//按id降序

       // const postMessages = await PostMessage.find({});// 返回{}格式的query
        res.status(200).json({data: posts,currentPage:Number(page), numberOfPage: Math.ceil(total/LIMIT)});
    }catch (e){
        res.status(404).json({messsge: e.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    try{
        //The res.json() function sends a JSON response
        await newPost.save();
        res.status(201).json(newPost);
    }catch (e){
        res.status(409).json({messsge: e.message});
    }
}

export const editPost = async (req, res) => {
    const {id:_id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not a valid id");
    const post = req.body;
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true}); // options new 返回的是新的还是旧的
    res.json(updatedPost);
}

export const getPost = async (req, res) => {
    const {id:_id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not a valid id");
    const fetchedPost = await PostMessage.findById(_id);
    res.json(fetchedPost);
}

export const deletePost = async (req, res) => {
    const {id:_id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not a valid id");
    const deletedPost = await PostMessage.findByIdAndDelete(_id);
    res.json(deletedPost);
}

export const likePost = async (req, res) => {
    const {id:_id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not a valid id");
    const post = await PostMessage.findById(_id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    //console.log(index);
    if(index === -1){
        post.likes.push(String(req.userId));
    }else{
        //console.log(post.likes);
        if(post.likes.length === 1) post.likes = []
        else post.likes.splice(index, index);
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true}); // options new 返回的是新的还是旧的
    res.json(updatedPost);
}


// '/posts/'+`searchQuery?=${query.search || 'none'}&tags=${query.tags}`);
export const getPostsBySearch = async (req, res)=>{
    const {searchQuery, tags} = req.query;
    //console.log(tags)
    try{
        let query_posts;
        if(searchQuery === 'none' && tags === '') query_posts = await PostMessage.find();
        else query_posts = await PostMessage.find({$or:[{title:searchQuery},{tags:{$in:tags.split(',')}}]});

        res.json(query_posts);


    }catch (e){
        console.log(e);
    }
}

export const commentPost = async (req, res) => {
    const {id} = req.params;
    const {value} = req.body;


    const post = await PostMessage.findById(id);
    post.comments.push(String(value));
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    res.json(updatedPost);

}