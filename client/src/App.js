import { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import Chart from './components/Chart'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import ShoppingList from './components/ShoppingList'

function App() {
  const [searchList, setSearchList] = useState([])
  const [selectedText, setSelectedText] = useState('')
  const [isSearchPage, setIsSearchPage] = useState(true)

  return (
    <Container style={{ marginTop: 40 }}>
      <NavBar isSearchPage={isSearchPage} setIsSearchPage={setIsSearchPage} />
      {isSearchPage ? (
        <>
          <SearchBar
            setSearchList={setSearchList}
            searchList={searchList}
            selectedText={selectedText}
            setSelectedText={setSelectedText}
          />
          <ShoppingList
            setSearchList={setSearchList}
            searchList={searchList}
            selectedText={selectedText}
          />
        </>
      ) : (
        <Chart />
      )}
    </Container>
  )
}

export default App
