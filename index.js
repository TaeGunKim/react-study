const express = require('express')
const app = express()
const port = 5000


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kimtg:12345@boilerplate.rcxpe.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDb Connected.. ~'))
  .catch(err => console.log(err))




app.get('/',(req,res) => res.send('Hello kimtg!<br/>'+
'안녕하세요 처음뵙겠습니다.'+
'뭘 보시나요 ㅎㅎ;'
))

app.listen(port, () => console.log('Example app listening on port ${port}!'))
