import React, { useState } from 'react'
import { Col, Input, Row, Button } from 'reactstrap'
import axios from 'axios'

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
  return (
    <Row>
      <Col xs='2'></Col>
      <Col xs='6'>
        <Input value={text} onChange={handleChange} />
        <ul>
          {data.map((item, index) => {
            return <li key={index}>🔍{item}</li>
          })}
        </ul>
      </Col>
      <Col xs='2'>
        <Button>검색</Button>
      </Col>
      <Col xs='2'></Col>
    </Row>
  )
}
