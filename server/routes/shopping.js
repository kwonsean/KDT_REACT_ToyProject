const KEY = require('../config/key.json')
const { CLIENT_ID, CLIENT_SECRET } = KEY

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.json())

router.get('/', (req, res, next) => {
  const type = req.query.type
  const text = req.query.text
  console.log(text)
  if ('search' === type) {
    var api_url =
      'https://mac.search.naver.com/mobile/ac?_q_enc=UTF-8&st=1&frm=mobile_nv&r_format=json&r_enc=UTF-8&r_unicode=0&t_koreng=1&ans=1&run=2&rev=4&q=' +
      encodeURI(text)
    console.log(api_url)

    const request = require('request')
    let options = {
      url: api_url,
    }
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body)
        const list = data['items']
          .flat()
          .flat()
          .filter((item) => item !== '0')
        console.log(list)
        res.send(list)
        // console.log(typeof body)
        // console.log(typeof response)
      } else {
        res.status(response.statusCode).end()
        console.log('error = ' + response.statusCode)
      }
    })
  }
})

module.exports = router
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