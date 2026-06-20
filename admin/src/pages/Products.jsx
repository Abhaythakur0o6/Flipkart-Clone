import "./css/Products.css"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from "../components/navbar/Navbar"
import Search from "../components/search/Search"
import ProductsList from "../components/productsList/ProductsList"
import { useEffect } from "react"
import { useState } from "react"
import { AllProducts } from "../service/OrderApi"
import { useProductContext } from "../context/ProductContext"
import { useSearchParams } from "react-router-dom"

const Products = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const queryString = searchParams.toString();

    const { products, setProducts } = useProductContext();
    const [totalPages, setTotalPages] = useState(null);
    const [totalProducts, setTotalProducts] = useState(null);

    useEffect(() => {
        if (!searchParams.get("page") || !searchParams.get("limit")) {
            setSearchParams({
                page: 1,
                limit: 4
            })
            return;
        }

        const fetchProducts = async () => {
            const { allProducts, pagination} = await AllProducts(queryString)
            setProducts(allProducts);
            setTotalPages(pagination.totalPages);
            setTotalProducts(pagination.totalProduct);
        }

        fetchProducts();
    }, [searchParams])

    const orderColumns = {
        first: "Product",
        second: "Category",
        third: "Price",
        fourth: "Stock",
        fifth: "Status",
        grid: "50px 2fr 1.5fr 1fr 1fr 1fr",
        index: 0
    }
    return (
        <>
            <div className="products">
                <div className="left-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <Navbar heading={"Products"} />
                    <Search />
                    <ProductsList orderColumns={orderColumns} products={products} totalPages={totalPages} totalProducts={totalProducts} />
                </div>
            </div>
        </>
    )
}

export default Products