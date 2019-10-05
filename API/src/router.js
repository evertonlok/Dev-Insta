const express=require('express');
const router=express.Router();
const DevController=require('../src/controllers/DevControllers');
const LikeControllers=require('./controllers/LikeControllers');
const DislikeControllers=require('./controllers/DislikeControllers')
router.get('/',(req,res)=>
{
    return res.json({ message : `Olá`});
});
router.post('/devs',DevController.store);
router.get('/devs',DevController.index);
router.post('/devs/:id/likes',LikeControllers.store);
router.post('/devs/:id/dislikes',DislikeControllers.store);
module.exports=router;