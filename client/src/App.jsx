import MainPage from './pages/MainPage'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DetailPage from './pages/DetailPage'
import Cart from './pages/Cart'
import OrderSuccess from './pages/OrderSuccess'
import Categories from './pages/Categories'
import LoginSignup from './components/LoginSignup/LoginSignup'
import { useDataContextProvider } from './context/DataProvider'
import MyOrders from './pages/MyOrders'
import OrderDetail from './pages/OrderDetail'
import ProductReview from './pages/ProductReview'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchMe } from './redux/features/UserSlice'

const App = () => {

  const dispatch = useDispatch()
  const { loginform } = useDataContextProvider();
  const { loading } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchMe())
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        {loading && <></>}
        {loginform && <LoginSignup />}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:id" element={<DetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/product/review/:id" element={<ProductReview />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App