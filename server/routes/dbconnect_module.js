const db_config = require('../config/db-config.json')
// console.log(db_config) // 잘 들어옴
var express = require('express')
var router = express.Router()
// mysql 패키지를 사용하겠다
const mysql = require('mysql')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

//mysql 서버 접속 정보
// createConnection => DB를 연결함 (요청이 들어올때 그때그때마다 접속) -> 사용자가 많아지면 힘듬 (실무에서 거의 안씀)
// const connection = mysql.createConnection({
// config폴더 확인
// });

// createPool => DB 연결함 (서버가 열리면 자동으로 제한된 수(connectionLimit)만큼 연결을 함 그리고 그 제한 값안에서 사용자들을 연결시킴)
const pool = mysql.createPool({
  connectionLimit: db_config.connectionLimit,
  waitForConnections: db_config.waitForConnections,
  host: db_config.host,
  port: db_config.port,
  database: db_config.database,
  user: db_config.user,
  password: db_config.password,
})

router.post('/', (req, res) => {
  const mybatisMapper = require('mybatis-mapper')
  const param = req.body
  console.log(param)
  // mybatis mapper경로 설정
  // /moels/SwToolsMapper.xml
  const mapperXml = './model/' + param.mapper + '.xml'
  console.log(param, mapperXml)
  mybatisMapper.createMapper([mapperXml])
  var time = new Date()
  console.log('## ' + time + ' ##')
  console.log('\n Called Mapper Name  = ' + param.mapper)

  var format = { language: 'sql', indent: '  ' }
  //mysql 쿼리 정보 세팅
  var query = mybatisMapper.getStatement(
    param.mapper,
    param.mapper_id,
    param,
    format
  )
  console.log('\n========= Node Mybatis Query Log Start =========')
  console.log(
    '* mapper namespce : ' + param.mapper + '.' + param.mapper_id + ' *\n'
  )
  console.log(query + '\n')

  pool.getConnection(function (err, connection) {
    connection.query(query, function (error, results) {
      if (error) {
        console.log('db error************* : ' + error)
      }
      let time2 = new Date()
      console.log('## ' + time2 + ' ##')
      console.log('## RESULT DATA LIST ## : \n', results)

      if (results) {
        string = JSON.stringify(results)
        let data = JSON.parse(string)
        // crud 타입에 따라 response 값을 다르게 정의한다.
        if ('select' === param.crud) {
          res.send({ data })
        } else {
          res.send('success')
        }
      } else {
        res.send('error')
      }
      // 반드시해줘야함 pool 사용시엔
      connection.release()
      console.log('========= Node Mybatis Query Log End =========\n')
    })
  })
})

module.exports = router
