import React, { useEffect, useState } from 'react'
import { PaginationItem, PaginationLink, Pagination } from 'reactstrap'
import axios from 'axios'

export default function PaginationComponent({
  selectedText,
  setSearchList,
  totalResults,
}) {
  const endPage = Math.ceil(totalResults / 10)
  // console.log('endpage', endPage)
  const [page, setPage] = useState(1)

  const paginationCLick = (e) => {
    const page = e.target.value
    console.log(e.target.value)
    axios
      .post('/shopping?type=chose', {
        selectedText: selectedText,
        page, // 1, 2, 3, 4, 5
      })
      .then((response) => {
        const { itemList } = response.data
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
        <PaginationLink
          onClick={paginationCLick}
          value={page * 1}
          dangerouslySetInnerHTML={{ __html: page * 1 }}
        ></PaginationLink>
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
