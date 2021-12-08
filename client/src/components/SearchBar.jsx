import React, { useState } from 'react'
import { Col, Input, Row, Button, ListGroup, ListGroupItem } from 'reactstrap'
import axios from 'axios'
import styles from './SearchBar.module.css'

export default function SearchBar() {
  const [data, setData] = useState([])
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
    search(e.target.value)
  }

  function search(searchText) {
    axios
      .get(`/shopping?type=search&text=${searchText}`)
      .then((response) => {
        setData(response.data)
        console.log('data', data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleClick = (e) => {
    console.log(e.target.innerText)
  }
  const btnClick = () => {
    console.log(text)
  }

  return (
    <Row>
      <Col xs='2'></Col>
      <Col xs='6'>
        <Input value={text} onChange={handleChange} />
        <ListGroup>
          {data.map((item, index) => {
            return (
              <ListGroupItem
                action
                tag='button'
                onClick={handleClick}
                className={styles.list}
                key={index}
                style={{ listStyle: 'none' }}
              >
                {item}
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </Col>
      <Col xs='2'>
        <Button onClick={btnClick}>검색</Button>
      </Col>
      <Col xs='2'></Col>
    </Row>
  )
}
