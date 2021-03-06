const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password :{
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExe: {
        type: Number
    }
})

userSchema.pre('save',function(next){

    var user = this;
    

    if(user.isModified('password')){
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err)
    
            bcrypt.hash(user.password , salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                console.log("go on~");
                next()
            })
        })    

    }else{
        console.log("not change password");
        next()
    }   


})

userSchema.methods.comparePassword = function(plainPassword,cb){


    //plainPassword 12345    암호화된 비번 $2b$10$0AcC3KrnG2DbsmxEsYH2k.1LLofmTBEmJEbjqP438p0Uth9V0vtZ6
    //복호화가 안됨

    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })


}


userSchema.methods.generateToken = function(cb){

    var user = this;

    console.log(user._id);
    //jsonwebtokken 을 이용해서 token을 생성하기

    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })

}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

        //token을 decode한다.(복호화)
    jwt.verify(token,'secretToken',function(err,decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //client의 token과 db의 보관된 token이 일치하는지 확인
        
        user.findOne({"_id":decoded, "token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
}

const User = mongoose.model('User', userSchema)


module.exports = { User }