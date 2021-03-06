import React, { useEffect, useState } from 'react'
import { Col, Input, Row, Button, ListGroup, ListGroupItem } from 'reactstrap'
import axios from 'axios'
import styles from './SearchBar.module.css'

export default function SearchBar({
  setSearchList,
  searchList,
  selectedText,
  setSelectedText,
  setTotalResults,
}) {
  const [data, setData] = useState([])
  const [text, setText] = useState('')
  const [isSearched, setIsSearched] = useState(false)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  /* 
  TODO 
  현재 구매목록페이지로 이동했다 다시 돌아오면 검색 내용은 남아있는데 
  ~에 대한 검색결과 입니다는 사라짐 그래서 searchList상태를 보고 true로 해줬더니 ~가 사라져서 안보임
  이는 selectedText를 app.js에서 관리하면 가능할듯 하지만 이방법은 너무 억지스러워서 일단 좀 더 고민
  차라리 searchList를 비우는게 나을지도 -> 우선 이 방법을 선택
  */
  useEffect(() => {
    setSearchList([])
  }, [])

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
      .post(`/shopping?type=search&text=${text}`)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function chose() {
    axios
      .post('/shopping?type=chose', {
        selectedText,
        page: 1,
      })
      .then((response) => {
        const { itemList, total } = response.data
        setSearchList(itemList)
        setIsSearched(true)
        setTotalResults(total)
        // console.log(total)
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
          <Input
            value={text}
            onChange={handleChange}
            placeholder='구매하실 상품을 검색해보세요!'
          />
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
      {!isSearched ? null : searchList.length === 0 ? (
        <div className={styles.result}>
          <strong>{selectedText}</strong>에 대한 상품 검색 결과가 없습니다.
        </div>
      ) : (
        <div className={styles.result}>
          <strong>{selectedText}</strong>에 대한 상품 검색 결과입니다.
        </div>
      )}
    </>
  )
}
