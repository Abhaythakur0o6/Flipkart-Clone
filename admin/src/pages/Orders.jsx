import Sidebar from "../components/sidebar/Sidebar"
import Navbar from "../components/navbar/Navbar"
import Search from "../components/search/Search"
import ProductsList from "../components/productsList/ProductsList"
import { useEffect, useState } from "react"
import { OrderList } from "../service/OrderApi"
import { useSearchParams } from "react-router-dom"

const Orders = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const [order, setOrder] = useState([])
  const [totalPages , setTotalPages] = useState(1);
  const [totalProducts , setTotalProducts] = useState(null);


  const page = searchParams.get("page") || 1;

  useEffect(() => {
    if (!searchParams.get("page") || !searchParams.get("limit")) {
      setSearchParams({
        page: 1,
        limit: 4
      })
      return;
    }

    const orders = async () => {
      const { allOrders , totalPages , totalOrders} = await OrderList(queryString);
      setOrder(allOrders);
      setTotalPages(totalPages);
      setTotalProducts(totalOrders);
    }
    orders();

  }, [searchParams])

  const orderColumns = {
    first: "Id",
    second: "Customer",
    third: "Amount",
    fourth: "Status",
    grid: "50px 2fr 1.5fr 1fr 1fr"
  }


  return (
    <>
      <div className="products">
        <div className="left-section">
          <Sidebar />
        </div>
        <div className="right-section">
          <Navbar heading={"Orders"} />
          <Search />
          <ProductsList orderColumns={orderColumns} orders={order} totalPages={totalPages} totalProducts={totalProducts} />
        </div>
      </div>
    </>
  )
}

export default Orders