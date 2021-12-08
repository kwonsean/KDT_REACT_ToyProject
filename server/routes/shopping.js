const API = require('../api.js')
const { CLIENT_ID, CLIENT_SECRET } = API

console.log(CLIENT_ID, CLIENT_SECRET)
const request = require('request')
request(
  'https://mac.search.naver.com/mobile/ac?_q_enc=UTF-8&st=1&frm=mobile_nv&r_format=json&r_enc=UTF-8&r_unicode=0&t_koreng=1&ans=1&run=2&rev=4&q=' +
    encodeURI('아이언맨'),
  function (error, response, body) {
    // console.error('error:', error) // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
    // console.log('body:', body) // Print the HTML for the Google homepage.
    console.log(response.body)
    console.log(response)
  }
)

// var express = require('express')
// var app = express()
// var client_id = CLIENT_ID
// var client_secret = CLIENT_SECRET
// app.get('/search/shop', function (req, res) {
//   var api_url =
//     'https://openapi.naver.com/v1/search/shop.json?query=' +
//     encodeURI('아이패드') // json 결과
//   //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
//   var request = require('request')
//   var options = {
//     url: api_url,
//     headers: {
//       'X-Naver-Client-Id': client_id,
//       'X-Naver-Client-Secret': client_secret,
//     },
//   }
//   request.get(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' })
//       res.end(body)
//       console.log('res', res)
//     } else {
//       res.status(response.statusCode).end()
//       console.log('error = ' + response.statusCode)
//     }
//   })
// })
// app.listen(5001, function () {
//   console.log(
//     'http://127.0.0.1:3000/search/shop?query=검색어 app listening on port 5001!'
//   )
// })
