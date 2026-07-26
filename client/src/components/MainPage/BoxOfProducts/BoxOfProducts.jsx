import "./BoxOfProducts.css"
import { Link } from "react-router-dom"

const BoxOfProducts = ({ products, title }) => {
  return (
    <>
      <div className="box-of-products">
        <h4>{title}</h4>
        <div className="box-section-products">
          {(products || []).slice(0, 4).map((product, index) => {
            return (
              <Link key={product._id || index} to={`/product/${product._id}`} style={{all:"unset", display:"block"}}>
                <div className="box-section-image">
                  <img src={product.detailUrl} alt="" />
                  <p>{product.title?.shortTitle || product.title?.longTitle || "Product"}</p>
                  <p style={{ color: 'green', fontWeight: "bold" }}>New Collection</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default BoxOfProducts