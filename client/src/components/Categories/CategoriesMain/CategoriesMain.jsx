import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../../redux/features/ProductSlice"
import "./CategoriesMain.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosInstance from "../../../service/AxiosInstance"

const CategoriesMain = ({products}) => {

    if(products.length<1) return <>...Loading</> 

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
                                    <p>	&#8377;{product.price.cost}</p>
                                    <p>	&#8377;{product.price.mrp}</p>
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
