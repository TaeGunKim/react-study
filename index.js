const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kimtg:12345@boilerplate.rcxpe.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDb Connected.. ~'))
  .catch(err => console.log(err))




app.get('/',(req,res) => res.send('Hello kimtg!<br/>'+
'안녕하세요 처음뵙겠습니다.'+
'뭘 보시나요 ㅎㅎ;'
))

app.post('/register',(req,res) => {
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

app.listen(port, () => console.log('Example app listening on port ${port}!'))
