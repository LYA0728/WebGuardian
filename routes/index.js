var express = require('express');
let request = require("request");
var router = express.Router();
const querystring = require("querystring");
var bodyParser = require('body-parser');

// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// 接受请求, 拿到数据后向OpenAI发送
router.post('/chatGPT', urlencodedParser, function (req, res, next) {

  
  let body = {
    flashId: "63dde9e648e4de0706f4ca14",
    spuId: "S9435518"
  };
  
  const url = "https://api.openai.com/v1/completions"

  const apikey = "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"
  const headers = {'content-type': 'application/json', 'Authorization': `Bearer ${apikey}`}
  let msg_data={'max_tokens': 2048, 'model': "text-davinci-003"}
  // console.log(typeof (req.body), req.body)
  let msg = ``
  for(var key in req.body){
    msg += JSON.parse(key)["msg"]
    
  };
  
  msg_data["prompt"] = msg

  console.log(msg_data,"456465")

  let opts = {
    url,
    method: "POST",
    headers: headers,
    body: JSON.stringify(msg_data)
  }

  var chatGPT_rep = "";

  request(opts, (e, b, d) => {
    if (e) return console.log(e);
    
    let res_data = JSON.parse(d)
    chatGPT_rep += d


    console.log(chatGPT_rep)
    // res.send(res_data);
    res.send({chatGPT_rep:chatGPT_rep});
    res.end();
    
  })
  // console.log(chatGPT_rep)
  

  //console.log(querystring.parse(postVal));
  
  // res.send({chatGPT_rep:'456'});
  // res.end();
});

module.exports = router;
