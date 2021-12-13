import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import styled from './ShoppingList.module.css'
import axios from 'axios'
import PaginationComponent from './PaginationComponent'

export default function ShoppingList({
  setSearchList,
  searchList,
  searchedText,
}) {
  console.log('this is sp', searchList)
  // 구매 버튼 클릭시 그 상품에 대한 정보 객체 매개변수로 받음
  const clickBuyBtn = (item) => {
    axios
      .post(`/shopping?type=buyItem`, {
        item,
      })
      .then((response) => {
        alert('구매를 완료했습니다!')
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
      {searchList.length > 0 && (
        <PaginationComponent
          searchedText={searchedText}
          setSearchList={setSearchList}
        />
      )}
    </div>
  )
}
