const DevSchema=require('../models/Dev');
const axios=require('axios');
module.exports={
    async index(req,res)
    {
        const {user} =req.headers;

        const loggedDev=await DevSchema.findById(user);
        
        const users= await DevSchema.find({
            $and:[
                {_id:{$ne:user}},
                {_id:{$nin:loggedDev.likes}},
                {_id:{$nin:loggedDev.dislikes}}
            ]
        })
        return res.json(users);
    },
    async store(req,res)
    {
        const { user } =req.body;
        const userExist=await DevSchema.findOne({user:user});
        if(userExist)
        {
           return res.json(userExist);
        }
        
            const api=await axios.get(`https://api.github.com/users/${user}`);
            const{ name, bio, avatar_url:avatar} =api.data;

            const dev= await DevSchema.create({
                name,
                user:user,
                bio,
                avatar,
            })
    
        return res.json({dev});
 
    },
}