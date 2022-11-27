
const {User,Post} = require('../models/blogger');


const getAllPosts = async (req, res)=>{
    try{    
        const posts = await Post.findAll(
            {
                where:{
                    isHidden:false
                }
            }
        );
        res.status(200);
        res.json(posts);
    }
    catch(error)
    {
        console.log(error);
        res.status(400);
        res.end();
    }
}

const getPost = async (req, res)=>{
    try{    
        
        const {id} = req.params;
        console.log(id);
        const post = await Post.findOne(
            {
            where:{
                id:id,
                isHidden:false
            }
        })
        res.status(200);
        res.json(post);
        
    }
    catch(error)
    {
        console.log(error);
        res.status(400);
        res.end();
    }
}

const deletePost =async (req, res)=>{
    try{
        const {userId} = req.user;
        if(await User.findOne({where:{id:userId,isAdmin:false}})){
            const {id} = req.params;
            
            const post = await Post.findOne({
                where:{
                    id:id,
                    UserId:userId
                }
            });
            const updated = await post.destroy();
            res.status(200);
            res.end();
        }else if(await User.findOne({where:{id:userId,isAdmin:true}})){
            const {id} = req.params;
            
            const post = await Post.findOne({
                where:{
                    id:id,
                    isHidden:false
                } 
            });
            const updated = await post.destroy();
            res.status(200);
            res.end();
        }
        throw 'error';
    }
    catch(error)
    {
        console.log(error);
        res.status(400);
        res.end();
    }
}

const updatePost = async (req, res)=>{
    try{
        const {userId} = req.user;
        const {id} = req.params;
        const updateInfo = req.body;
        const post = await Post.findOne({
            where:{
                id:id,
                UserId:userId
            }
        });
        const updated = await post.update(updateInfo);
        res.status(200);
        res.json(updated);
    }
       
    
    catch(error)
    {
        console.log(error);
        res.status(400);
        res.end();
    }
}

const createPost = async (req, res)=>{
    try{    
        const {title,content} = req.body;
        const {userId} = req.user;
        const crpost = await Post.create({UserId:userId,title,content});
        res.status(200);
        res.json(crpost);
    }
    catch(error)
    {
        console.log(error);
        res.status(400);
        res.end();
    }
}

module.exports = {
    getAllPosts ,
    getPost,
    deletePost,
    updatePost,
    createPost
} 