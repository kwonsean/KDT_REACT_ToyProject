import React, { useEffect, useState } from 'react'
import { PaginationItem, PaginationLink, Pagination } from 'reactstrap'
import axios from 'axios'

export default function PaginationComponent({
  selectedText,
  setSearchList,
  totalResults,
}) {
  // TODO 마지막 페이지 계산 및 표현, 끝페이지 이동 처리, 끞페이지시 next버튼 비활성화

  const endPage = Math.ceil(totalResults / 10)
  // console.log('endpage', endPage)
  const [page, setPage] = useState(1)
  const [pagePoint, setPagePoint] = useState(0)

  const clickFirstPage = () => {
    setPagePoint(0)
  }
  const clickPrevPage = () => {
    setPagePoint((cur) => cur - 5)
  }
  const clickNextPage = () => {
    setPagePoint((cur) => cur + 5)
  }

  useEffect(() => {
    axios
      .post('/shopping?type=chose', {
        selectedText: selectedText,
        page: pagePoint + 1, // 1, 2, 3, 4, 5
      })
      .then((response) => {
        const { itemList } = response.data
        setSearchList(itemList)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [pagePoint])

  const paginationCLick = (e) => {
    const value = e.target.value
    console.log(e.target)
    axios
      .post('/shopping?type=chose', {
        selectedText: selectedText,
        page: value, // 1, 2, 3, 4, 5
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
        <PaginationLink
          first
          onClick={clickFirstPage}
          disabled={pagePoint === 0 ? true : false}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          onClick={clickPrevPage}
          disabled={pagePoint === 0 ? true : false}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={paginationCLick}
          value={1 + pagePoint}
          dangerouslySetInnerHTML={{ __html: 1 + pagePoint }}
        ></PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={paginationCLick}
          value={2 + pagePoint}
          dangerouslySetInnerHTML={{ __html: 2 + pagePoint }}
        ></PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={paginationCLick}
          value={3 + pagePoint}
          dangerouslySetInnerHTML={{ __html: 3 + pagePoint }}
        ></PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={paginationCLick}
          value={4 + pagePoint}
          dangerouslySetInnerHTML={{ __html: 4 + pagePoint }}
        ></PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={paginationCLick}
          value={5 + pagePoint}
          dangerouslySetInnerHTML={{ __html: 5 + pagePoint }}
        ></PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next onClick={clickNextPage} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href='#' last />
      </PaginationItem>
    </Pagination>
  )
}
