import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './Home.jsx'
import ItemDetailPage from "./ItemDetailPage.jsx";
import InputCreate from './components/InputCreate.jsx'


const App = () => {
  const [data, setData] = useState({})
  const urlApi = 'http://localhost:3000'

const fetchData = async () => { 
  try {
    const response = await fetch(urlApi)
    console.log(response)
    const data = await response.json()
    setData(data)
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchData()
}, [])

return (
  <Router>
    <Routes>
       
      <Route path="/" element={<Home data={data}/>} /> 
      <Route path="/Item/:id" element={<ItemDetailPage />}></Route>
      <Route path="/create" element={<InputCreate />}>
      
       
      </Route>
      
    </Routes>
  </Router>
);
}


export default App;
