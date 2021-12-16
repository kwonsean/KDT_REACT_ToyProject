const KEY = require('../config/key.json')
const { CLIENT_ID, CLIENT_SECRET } = KEY

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.json())

router.post('/', (req, res, next) => {
  const type = req.query.type
  console.log(type)
  if ('search' === type) {
    const text = req.query.text
    var api_url =
      'https://mac.search.naver.com/mobile/ac?_q_enc=UTF-8&st=1&frm=mobile_nv&r_format=json&r_enc=UTF-8&r_unicode=0&t_koreng=1&ans=1&run=2&rev=4&q=' +
      encodeURI(text)
    // console.log(api_url)

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
          .filter((item, index) => index % 2 === 0)
        // console.log(list)
        // console.log(data)
        // console.log(data['items'])
        res.send(list)
        // console.log(typeof body)
        // console.log(typeof response)
      } else {
        res.status(response.statusCode).end()
        console.log('error = ' + response.statusCode)
      }
    })
  } else if ('chose' === type) {
    const selectedText = req.body.selectedText
    const page = req.body.page
    // console.log(page)
    // console.log(selectedText)
    var api_url =
      'https://openapi.naver.com/v1/search/shop.json?query=' +
      encodeURI(selectedText) +
      `&start=${10 * page - 10 === 0 ? 1 : 10 * page - 9}` // 이전 코드는 10이 기본값으로 들어가게 되어 1 ~ 9번은 무시되는 문제가 있어 이를 해결함
    // console.log(api_url)

    const request = require('request')
    let options = {
      url: api_url,
      headers: {
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Naver-Client-Secret': CLIENT_SECRET,
      },
    }
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body)
        const list = data['items']
        const sendData = {
          total: data.total,
          itemList: list,
        }
        // console.log(list)
        // console.log(data)
        // console.log(data['items'])
        res.send(sendData)
      } else {
        res.status(response.statusCode).end()
        console.log('error = ' + response.statusCode)
      }
    })
  } else if ('selectAllDB' === type) {
    const dbconnect_Module = require('./dbconnect_module')

    // mybaits
    req.body.mapper = 'NaverShoppingMapper' // 파일명 정의
    req.body.crud = 'select' // select, insert, update, delete 중 하나 작성
    req.body.mapper_id = 'selectAllDB'

    router.use('/', dbconnect_Module)
    next('route')
  } else if ('selectCategoryCount' === type) {
    const dbconnect_Module = require('./dbconnect_module')

    // mybaits
    req.body.mapper = 'NaverShoppingMapper' // 파일명 정의
    req.body.crud = 'select' // select, insert, update, delete 중 하나 작성
    req.body.mapper_id = 'selectCategoryCount'

    router.use('/', dbconnect_Module)
    next('route')
  } else if ('selectCategoryDetail' === type) {
    const dbconnect_Module = require('./dbconnect_module')

    // mybaits
    req.body.mapper = 'NaverShoppingMapper' // 파일명 정의
    req.body.crud = 'select' // select, insert, update, delete 중 하나 작성
    req.body.mapper_id = 'selectCategoryDetail'

    router.use('/', dbconnect_Module)
    next('route')
  } else if ('orderDate' === type) {
    const dbconnect_Module = require('./dbconnect_module')

    // mybaits
    req.body.mapper = 'NaverShoppingMapper' // 파일명 정의
    req.body.crud = 'select' // select, insert, update, delete 중 하나 작성
    req.body.mapper_id = 'orderDate'

    router.use('/', dbconnect_Module)
    next('route')
  } else if ('buyItem' === type) {
    const item = req.body.item
    console.log('this is item!!!', item)
    const dbconnect_Module = require('./dbconnect_module')

    // mybaits
    req.body.mapper = 'NaverShoppingMapper' // 파일명 정의
    req.body.crud = 'insert' // select, insert, update, delete 중 하나 작성
    req.body.mapper_id = 'buyItem'

    router.use('/', dbconnect_Module)
    next('route')
  }
})

module.exports = router

// 네이버 문서 내용
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
