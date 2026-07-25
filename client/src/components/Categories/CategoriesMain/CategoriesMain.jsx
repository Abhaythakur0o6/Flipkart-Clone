import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../../redux/features/ProductSlice"
import "./CategoriesMain.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosInstance from "../../../service/AxiosInstance"

const CategoriesMain = ({ products }) => {

    if (products.length < 1) return <loading className="Categories-loading">
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </loading>

    return (
        <>
            <div className="category-products">
                {products.map((product) => (
                    <Link to={`/product/${product._id}`} style={{ all: "unset" }}>
                        <div className="category-product">
                            <img src={product.detailUrl} alt="product-img" />
                            <div className="product-detail">
                                <p>{product.title.shortTitle}</p>
                                <div className="product-price">
                                    <p>	&#8377;{product.price.cost.toLocaleString('en-IN')}</p>
                                    <p>	&#8377;{product.price.mrp.toLocaleString('en-IN')}</p>
                                    <p>{product.price.discount} off</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default CategoriesMain
