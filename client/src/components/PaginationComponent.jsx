import React, { useEffect, useState } from 'react'
import { PaginationItem, PaginationLink, Pagination } from 'reactstrap'
import axios from 'axios'

export default function PaginationComponent({ selectedText, setSearchList }) {
  // TODO 자꾸 타이밍이 한박자 늦긴한데 이건 pagination에서 처리하려고 하니깐 발생하는 문제라고 생각
  // 이건 숫자를 눌러야 axios가 시작되기 때문에! 애초에 total은 초반에 searchBar에서 잡아서 가져와 사용하는게 맞을듯!
  const [totalItems, setTotalItems] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  console.log('pages', totalPages)
  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / 10))
    console.log('전체 물건 수', totalItems, '전체 가능 페이지 수', totalPages)
  }, [totalItems])

  const paginationCLick = (e) => {
    const page = e.target.value
    console.log(e.target.value)
    axios
      .post('/shopping?type=chose', {
        selectedText: selectedText,
        page, // 1, 2, 3, 4, 5
      })
      .then((response) => {
        const { itemList, total } = response.data
        // console.log(response.data)
        setTotalItems(total)
        console.log('바로 출력되는 total', total)
        setSearchList(itemList)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <Pagination style={{ width: 300, margin: '0 auto 40px' }}>
      <PaginationItem>
        <PaginationLink first href='#' />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href='#' previous />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={paginationCLick} value='1'>
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={paginationCLick} value='2'>
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={paginationCLick} value='3'>
          3
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={paginationCLick} value='4'>
          4
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={paginationCLick} value='5'>
          5
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href='#' next />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href='#' last />
      </PaginationItem>
    </Pagination>
  )
}
