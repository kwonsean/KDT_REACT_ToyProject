import { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import Chart from './components/Chart'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import ShoppingList from './components/ShoppingList'

function App() {
  const [searchList, setSearchList] = useState([])
  const [searchedText, setSearchedText] = useState('')
  const [isSearchPage, setIsSearchPage] = useState(true)
  useEffect(() => {}, [searchList])
  return (
    <Container style={{ marginTop: 40 }}>
      <NavBar isSearchPage={isSearchPage} setIsSearchPage={setIsSearchPage} />
      {isSearchPage ? (
        <>
          <SearchBar
            setSearchList={setSearchList}
            searchList={searchList}
            setSearchedText={setSearchedText}
          />
          <ShoppingList
            setSearchList={setSearchList}
            searchList={searchList}
            searchedText={searchedText}
          />
        </>
      ) : (
        <Chart />
      )}
    </Container>
  )
}

export default App
