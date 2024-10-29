import Post from '../models/Post.js';
import User from '../models/User.js';

export const createPost = async(request,response)=>{
    try {
        const {userId, description, picturePath} = request.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName:user.firstname,
            lastName:user.lastname,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        })
        await newPost.save();
        const post = await Post.find();

        response.status(201).json(post);
    } catch (error) {
        console.log(error);
    }
};
export const getFeedPosts = async(request,response)=>{
    try {
        const post = await Post.find();
        response.status(201).json(post);
    } catch (error) {
        console.log(error);
    }
};

export const getUserPosts = async(request,response)=>{
    try {
        const {userId} = request.params;
        const post = await Post.findById(userId);
        response.status(201).json(post);
    } catch (error) {
        console.log(error);
    }
};

export const likePost = async(request,response)=>{
    try {
        const {id} = request.params;
        const {userId} = request.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new:true}
        );
        response.status(201).json(updatedPost);
    } catch (error) {
        console.log(error);
    }
}