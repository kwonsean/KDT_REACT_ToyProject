import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import styled from './ShoppingList.module.css'
import axios from 'axios'
console.log(styled)

export default function ShoppingList({ searchList }) {
  console.log('this is sp', searchList)
  // 구매 버튼 클릭시 그 상품에 대한 정보 객체 매개변수로 받음
  const clickBuyBtn = (item) => {
    axios
      .post('/shopping?type=select')
      .then((response) => {
        const { data } = response.data
        return data
      }) // DB에 있는 전체 자료를 돌면서 id가 겹치는지 체크
      .then((datas) => {
        let isOnDB = false
        datas.forEach((data) => {
          if (data.productId === item.productId) {
            isOnDB = true
          }
        }) // 아이디가 겹치면 update실행
        if (isOnDB) {
          console.log('is on DB', item)
          axios.post(`/shopping?type=updateDB`, {
            item,
          })
        } else {
          // 아이디가 없으면 insert실행
          console.log('is new!', item)
          axios.post(`/shopping?type=insert`, {
            item,
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      {searchList.length > 0 && (
        <Row className={styled.rowTitle}>
          <Col xl='1'>상품이미지</Col>
          <Col xs='6'>상품 명</Col>
          <Col xs='2'>최저가</Col>
          <Col xs='2'>판매처</Col>
          <Col xs='1'>구매</Col>
        </Row>
      )}

      {searchList.length > 0 &&
        searchList.map((item) => {
          const htmlTitle = item.title
          return (
            <Row className={styled.row} key={item.productId}>
              <Col xs='1'>
                <img alt='item' src={item.image} width='100%' />
              </Col>
              <Col xs='6'>
                <h5
                  dangerouslySetInnerHTML={{ __html: htmlTitle }}
                  className={styled.title}
                ></h5>
              </Col>
              <Col xs='2'>
                <span>
                  {item.lprice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                </span>
              </Col>
              <Col xs='2'>
                <span>{item.mallName}</span>
              </Col>
              <Col xs='1'>
                <Button onClick={() => clickBuyBtn(item)}>구매</Button>
              </Col>
            </Row>
          )
        })}
    </div>
  )
}
