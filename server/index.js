const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const {auth} = require('./middleware/auth');
const {User} = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());

app.use(cookieParser());


const mongoose = require('mongoose')
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser:true, useUnifiedTopology:true,
    useCreateIndex: true, useFindAndModify: false
  }
).then(() => console.log('MongoDb Connected.. ~'))
  .catch(err => console.log(err))




app.get('/',(req,res) => res.send('Hello kimtg!<br/>TEst'))

app.get('/api/hello', (req,res) => {
  res.send("안녕하세요! /api/hello에서 드립니다!")
})

app.post('/api/users/register',(req,res) => {
  //회원가입 필요정보 client에서 가져와서
  //database에 넣어준다.

  const user = new User(req.body)

  user.save((err,userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success:true
    })
  })
})

app.post('/api/users/login',(req,res) => {

  //1.요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({email:req.body.email},(err,user) =>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message:"제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

  //2.요청된 이메일이 데이터베이스에 있다면 비밀번호가 같은지 확인

    user.comparePassword(req.body.password, (err,isMatch) => {
      if(!isMatch)
        return res.json({loginSuccess:false,message:"비밀번호가 틀렸습니다."})

        //3.비밀번호 맞으면 토큰생성
        user.generateToken((err,user) => {
          if(err) return res.status(400).send(err);

          //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지...
          //이 예제에서는 쿠키에 함
          res.cookie("x_auth",user.token)
          .status(200)
          .json({loginSuccess:true,userId:user._id})
          


        })  
    })
  })
})


app.get('/api/users/auth', auth, (req,res) =>{

  //여기까지 미들웨어를 통과해왔다는 얘기는 authentication이 True 임

  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth : true,
    email : req.user.email,
    name : req.user.nae,
    lastname : req.user.lastname,
    role:req.user.role,
    image: req.user.image
  })


})

app.get('/api/users/logout', auth, (req,res) => {
  User.findOneAndUpdate({_id:req.user._id}, 
    {token :""},
    (err,user) =>{
      if(err) return res.json({success:false, err});
      return res.status(200).send({
        success:true
      })
    })
})



const port = 5000
app.listen(port, () => console.log('Example app listening on port ${port}!'))
