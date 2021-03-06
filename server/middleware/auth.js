const { model } = require("mongoose");
const {User} = require("../models/User");

let auth = (req,res,next)=> {

     //인증처리를 하는곳

     //1. client cookie에서 token을 가져온다.
    let token = req.cookies.x_auth;



     //2. token을 복호화 한 후 user 를 찾는다.
    User.findByToken(token,(err,user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth : false , error: true})
        
        req.token = token;
        req.user = user;
        next();

    })

     //3. user가 있으면 인증 O

     //4. user가 없으면 인증 X




}

//해당 파일을 다른데서도 사용할수있게 선언함
module.exports = {auth};