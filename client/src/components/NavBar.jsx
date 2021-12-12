import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

export default function NavBar({ isSearchPage, setIsSearchPage }) {
  const navClick = (e) => {
    if (e.target.innerHTML === '구매 목록') {
      setIsSearchPage(false)
    } else {
      setIsSearchPage(true)
    }
  }
  return (
    <div>
      <Nav pills style={{ cursor: 'pointer' }}>
        <NavItem>
          <NavLink active={isSearchPage} onClick={navClick}>
            상품 검색 & 구매
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={!isSearchPage} onClick={navClick}>
            구매 목록
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  )
}
