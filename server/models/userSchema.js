const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const UserData = new mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
    },
    phone:{
        required:true,
        type:Number,
    },
    password:{
        required:true,
        type:String,
    },
    conpassword:{
        required:true,
        type:String,
    },
    blogs:[
        {
            blog:{
                type:String
            }
        }
    ],
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]
})


UserData.pre('save' , async function (next){
    console.log('hashing password')
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 12);
        this.conpassword = await bcrypt.hash(this.conpassword , 12);    
    }
})


UserData.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token
    }catch (err){
        console.log(err);
    } 
}



module.exports = User = mongoose.model('USER' , UserData)