import logo from './logo.svg'
import './App.css'
import { Container } from 'reactstrap'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <Container style={{ marginTop: 40 }}>
      <SearchBar />
    </Container>
  )
}

export default App
