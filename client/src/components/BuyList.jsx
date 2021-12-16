import React from 'react'
import { Col, Row } from 'reactstrap'
import styled from './ShoppingList.module.css'

export default function BuyList({ item, index }) {
  const { title, image, buyCount, insertDate } = item
  const htmlTitle = title
  return (
    <div>
      <Row className={styled.row} key={item.productId}>
        <Col xs='1'>{index + 1}</Col>
        <Col xs='1'>
          <img alt='item' src={image} width='100%' />
        </Col>
        <Col xs='6'>
          <h5
            dangerouslySetInnerHTML={{ __html: htmlTitle }}
            className={styled.title}
          ></h5>
        </Col>
        <Col xs='2'>
          <span>{insertDate.slice(2, 10)}</span>
        </Col>
        <Col xs='2'>
          <span>{buyCount} 건</span>
        </Col>
      </Row>
    </div>
  )
}
