import { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import SearchBar from './components/SearchBar'
import ShoppingList from './components/ShoppingList'

function App() {
  const [searchList, setSearchList] = useState([])
  useEffect(() => {
    console.log('this is in App', searchList)
  }, [searchList])
  return (
    <Container style={{ marginTop: 40 }}>
      <SearchBar setSearchList={setSearchList} />
      <ShoppingList searchList={searchList} />
    </Container>
  )
}

export default App
