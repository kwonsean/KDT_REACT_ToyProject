import React from 'react'
import { Button, Col, Row } from 'reactstrap'

export default function ShoppingList({ searchList }) {
  console.log('this is sp', searchList)

  return (
    <ul>
      {searchList.length > 0 &&
        searchList.map((item) => {
          return (
            <Row style={{ textAlign: 'center' }} key={item.productId}>
              <Col xs='1'>
                <img alt='item' src={item.image} width='100%' />
              </Col>
              <Col xs='6'>
                <h5>{item.title}</h5>
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
                <Button>구매</Button>
              </Col>
            </Row>
          )
        })}
    </ul>
  )
}