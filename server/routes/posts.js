import express from "express";

import {getPosts, getPost, createPost, editPost, deletePost, likePost, getPostsBySearch, commentPost} from "../controllers/posts.js";
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getPosts).get('/search',getPostsBySearch)
    .get('/:id',getPost)
    .post('/', auth, createPost)
    .post('/:id/commentPost', auth, commentPost)
    .patch('/:id', auth, editPost)
    .patch('/:id/like', auth, likePost)
    .delete('/:id', auth, deletePost)

export default router;