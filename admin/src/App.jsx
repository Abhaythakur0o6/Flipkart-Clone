import '@fortawesome/fontawesome-free/css/all.min.css';
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddProducts from './pages/AddProducts';
import Orders from './pages/Orders';
import Products from './pages/Products';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Products/>} />
          <Route path='/add-products' element={<AddProducts />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App