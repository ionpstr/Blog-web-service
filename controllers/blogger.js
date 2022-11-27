const {Post} = require('../models/blogger');


const getAllMyPosts =async (req, res) => {
    try{
        const {userId} = req.user;
       
        const myposts =await Post.findAll({
            where: {
                UserId: userId
            }
        });
        res.json(myposts);
    }
    catch(error)
    {
        console.log(error);
        res.end();
    }
}



module.exports = {
    getAllMyPosts
   
}