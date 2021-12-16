import React, { useEffect, useState } from 'react'
import { PaginationItem, PaginationLink, Pagination } from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function PaginationComponent({
  selectedText,
  setSearchList,
  totalResults,
}) {
  // TODO 마지막페이지 이동시 진짜 마지막 페이지가 아닌 마지막 페이지가 포함된 가장큰 5의배수 + 1 페이지로 이동함 (ex. totalEndPage 27 => lastPage이동시 26page로 감)
  // 생각나는 해결책 : totalEndPage의 5를 나눈값에 나머지 값을 더해서 API 호출 (함수를 하나 더?)

  const totalEndPage = Math.floor(totalResults / 10)
  // console.log('totalEndPage', totalEndPage)

  // 가능한 마지막 요소 조회가 1000까지라 이 이상 넘어가면 막아줘야함
  let possibleEndPagePoint = parseInt(totalEndPage / 5) * 5
  possibleEndPagePoint = possibleEndPagePoint > 100 ? 95 : possibleEndPagePoint

  const [pagePoint, setPagePoint] = useState(0)

  const clickFirstPage = () => {
    if (pagePoint === 0) {
      jumpPage()
      return
    }
    setPagePoint(0)
  }

  const clickPrevPage = () => {
    setPagePoint((cur) => cur - 5)
  }

  const clickNextPage = () => {
    setPagePoint((cur) => {
      if (cur + 5 > totalEndPage || cur + 5 > 95) {
        sweetAlert()
        return cur
      } else {
        return cur + 5
      }
    })
  }

  const clickLastPage = () => {
    setPagePoint(possibleEndPagePoint)
  }

  useEffect(() => {
    setPagePoint(0)
  }, [selectedText])

  useEffect(() => {
    jumpPage()
  }, [pagePoint])

  // pagePoint가 변하는 경우 실행되는 함수 (숫자의외의 버튼 클릭시 동작)
  const jumpPage = () => {
    // console.log('movePage!!')
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
  }

  // 숫자 pagination을 클릭시 그 버튼이 가지고 있는 value값으로 검색
  const paginationNumberCLick = (e) => {
    const value = e.target.value
    // console.log(e.target)

    // 전체 상품 결과가 10의 배수로 딱 나누어 떨어지는 경우에는 totalEndPage + 1을 하면 상품이 없는 페이지가 선택이 됨
    // 반면 10의  배수로 나누어 떨어지지 않는 경우에는 마지막페이지가 선택이 되지 않기 때문에 +1을 해서 해결을 해줘야 함
    // 이 두 문제를 해결하기 위해 아래와 같은 if문을 사용
    if (totalResults % 10 === 0 && value > totalEndPage) {
      sweetAlert()
      return
    } else if (totalResults % 10 !== 0 && value > totalEndPage + 1) {
      sweetAlert()
      return
    }
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
        <PaginationLink first onClick={clickFirstPage} />
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
          onClick={paginationNumberCLick}
          value={1 + pagePoint}
          dangerouslySetInnerHTML={{ __html: 1 + pagePoint }}
        ></PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={paginationNumberCLick}
          value={2 + pagePoint}
          dangerouslySetInnerHTML={{ __html: 2 + pagePoint }}
        ></PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={paginationNumberCLick}
          value={3 + pagePoint}
          dangerouslySetInnerHTML={{ __html: 3 + pagePoint }}
        ></PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={paginationNumberCLick}
          value={4 + pagePoint}
          dangerouslySetInnerHTML={{ __html: 4 + pagePoint }}
        ></PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={paginationNumberCLick}
          value={5 + pagePoint}
          dangerouslySetInnerHTML={{ __html: 5 + pagePoint }}
        ></PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next onClick={clickNextPage} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last onClick={clickLastPage} />
      </PaginationItem>
    </Pagination>
  )
}

const sweetAlert = () => {
  Swal.fire({
    position: 'top',
    icon: 'info',
    title: '더이상 상품 페이지가 없습니다!',
    showConfirmButton: false,
    timer: 1500,
  })
}
