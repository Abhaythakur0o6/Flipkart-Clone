import "./CategoriesMain.css"
import { Link } from "react-router-dom"

const CategoriesMain = ({ products, loading }) => {

    if (loading) return (
        <div className="Categories-loading">
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )

    if (!products || products.length < 1) return (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#666" }}>
            No products found
        </div>
    )

    return (
        <>
            <div className="category-products">
                {products.map((product) => (
                    <Link key={product._id} to={`/product/${product._id}`} style={{ all: "unset" }}>
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
