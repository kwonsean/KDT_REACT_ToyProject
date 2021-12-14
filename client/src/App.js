import { useState } from 'react'
import { Container } from 'reactstrap'
import Chart from './components/Chart'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import ShoppingList from './components/ShoppingList'

function App() {
  const [searchList, setSearchList] = useState([])
  const [selectedText, setSelectedText] = useState('')
  const [isSearchPage, setIsSearchPage] = useState(true)
  const [totalResults, setTotalResults] = useState(0)
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
            setTotalResults={setTotalResults}
          />
          <ShoppingList
            setSearchList={setSearchList}
            searchList={searchList}
            selectedText={selectedText}
            totalResults={totalResults}
          />
        </>
      ) : (
        <Chart />
      )}
    </Container>
  )
}

export default App
