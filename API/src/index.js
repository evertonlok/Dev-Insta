const express=require('express');
const app=express();
const router=require('./router');
const mongoose=require('mongoose');
const cors=require('cors');
app.use(cors());
mongoose.connect('mongodb+srv://everton:123@cluster0-dystm.mongodb.net/instaDEV?retryWrites=true&w=majority',
{
    useNewUrlParser:true
});

app.use(express.json());
app.use(router);
app.listen(3001,()=>
    console.log("Rodando na porta 3001")
);