import React, { useEffect, useState } from 'react'
import { Col, Input, Row, Button, ListGroup, ListGroupItem } from 'reactstrap'
import axios from 'axios'
import styles from './SearchBar.module.css'

export default function SearchBar({ setSearchList }) {
  const [data, setData] = useState([])
  const [text, setText] = useState('')
  const [selectedText, setSelectedText] = useState('')
  const [isSearched, setIsSearched] = useState(false)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    if (selectedText === '') return
    chose()
    setText('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedText])

  function search() {
    axios
      .get(`/shopping?type=search&text=${text}`)
      .then((response) => {
        setData(response.data)
        // console.log('data', data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function chose() {
    axios
      .get(`/shopping?type=chose&selectedText=${selectedText}`)
      .then((response) => {
        console.log('최초의 것', response.data)
        setSearchList(response.data)
        setIsSearched(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleClick = (e) => {
    setSelectedText(e.target.innerText)
  }
  const btnClick = () => {
    setSelectedText(text)
  }

  return (
    <>
      <Row>
        <Col xs='3'></Col>
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
        <Col xs='1'>
          <Button onClick={btnClick}>검색</Button>
        </Col>
        <Col xs='2'></Col>
      </Row>
      {isSearched ? (
        <div className={styles.result}>
          <strong>{selectedText}</strong>에 대한 검색 결과입니다.
        </div>
      ) : null}
    </>
  )
}
