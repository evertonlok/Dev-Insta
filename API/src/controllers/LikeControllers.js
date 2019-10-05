const DevSchema=require('../models/Dev');
module.exports={
    async store(req,res)
    {
        console.log(req.params.id);
        console.log(req.headers.user);
        const {id} = req.params;
        const {user} = req.headers;

        const loggedDev=await DevSchema.findById(user);
        const targetDev=await DevSchema.findById(id);

        if(!targetDev)
        {
            return res.status(400).json({erro: 'Dev not exist'});
        }
        if(targetDev.likes.includes(loggedDev._id))
        {
            console.log('Deu Match');
        }
        
        loggedDev.likes.push(targetDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
    }
}