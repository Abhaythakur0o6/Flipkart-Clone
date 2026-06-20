import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { DeleteProduct } from "../../service/OrderApi";
import { useSearchParams } from "react-router-dom";
import "./ProductList.css"

const ProductsList = ({ list, orderColumns, products, orders, totalPages ,totalProducts }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const { setProducts } = useProductContext()
    let index = 0;

    const deleteProduct = async (id) => {
        const product = await DeleteProduct(id)
        setProducts(prev => prev.filter(product => product._id != id))
    }

    const changeParams = (type) => {
        if (type == "prev" && page > 1) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", page - 1);
            setSearchParams(newParams);
        }

        if (type == "next" && page < totalPages) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", Number(page) + 1);
            setSearchParams(newParams);
        }
    }

    return (
        <>
            <div className="product-list-container">
                <div className="heading-section">
                    <p>All {orderColumns.heading}</p>
                    <p>Showing 4 out of {totalProducts} Products</p>
                </div>
                <div className="products-list">
                    <div className="products-grid header" style={
                        {
                            display: "grid",
                            gridTemplateColumns: orderColumns.grid
                        }
                    }>
                        <span>#</span>
                        <span>{orderColumns.first}</span>
                        <span>{orderColumns.second}</span>
                        <span>{orderColumns.third}</span>
                        <span>{orderColumns.fourth}</span>
                        {orderColumns.fifth
                            ?
                            <span>{orderColumns.fifth}</span>
                            :
                            null
                        }

                    </div>

                    <div className="products-grid row" style={
                        {
                            display: "grid",
                            gridTemplateColumns: orderColumns.grid,
                            gap: "2rem"
                        }
                    }>
                        {products
                            ?
                            products.map((product , i) => (
                                <>
                                    <span>{(page - 1) * limit + i + 1}</span>
                                    <span>{product.title.shortTitle}</span>
                                    <span>{product.category}</span>
                                    <span>{product.price.cost}</span>
                                    {orderColumns.fifth ? <span>{product.quantity}</span> : null}
                                    <button onClick={() => deleteProduct(product._id)} className="status delete">Delete</button>
                                </>
                            ))
                            :
                            orders.map((order , i) => (
                                <>
                                   <span>{(page - 1) * limit + i + 1}</span>
                                    <span>{order._id}</span>
                                    <span>{order.user.name}</span>
                                    <span>{order.totalPrice}</span>
                                    {orderColumns.fifth ? <span>25</span> : null}
                                    <button className="status active">{order.status}</button>
                                </>
                            ))
                        }
                    </div>
                </div>
                <div className="page-no">
                    <img src="https://cdn-icons-png.flaticon.com/128/271/271220.png" onClick={() => changeParams("prev")} alt="prev" />
                    <input value={page} readOnly />
                    <img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" onClick={() => changeParams("next")} alt="Next" />
                </div>
            </div>
        </>
    )
}

export default ProductsList