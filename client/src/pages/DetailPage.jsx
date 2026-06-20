import React, { Fragment, useEffect, } from 'react'
import Header from '../components/Header/Header'
import "./css/detailPage.css"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Footer from '../components/Footer/Footer'
import { fetchProductDetail } from '../redux/features/ProductSlice'
import { addToCart } from '../redux/features/CartSlice'
import { useDataContextProvider } from '../context/DataProvider'
import { DeleteReview, placeOrderApi, toPaymentGateway } from '../service/Api'
import { useState } from 'react'

const DetailPage = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { setReviewForm } = useDataContextProvider();

    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchProductDetail(id))
    }, [id, dispatch])

    const { product } = useSelector(state => state.products)

    const { user } = useSelector(state => state.user)

    const deleteReview = async () => {
        const review = await DeleteReview(id)
        dispatch(fetchProductDetail(id))
    }

    // CART
    const addItToCart = (product, quantity) => {
        dispatch(addToCart({ product, quantity }))
    }

    if (!product?._id) return;

    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    if (product.reviews) {
        product.reviews.forEach((review) => {
            const rating = Math.round(review.rating);
            if (ratingCounts[rating] !== undefined) {
                ratingCounts[rating]++;
            }
        });
    }
    const totalReviews = product.reviews ? product.reviews.length : 0;

    const editReview = () => {
        setReviewForm(true)
        navigate(`/product/review/${id}`)
    }

    const buyThisProduct = async (totalPrice) => {
        const cartItems = [product]
        const orderId = await placeOrderApi(cartItems, totalPrice)
        setLoading(true)
        const travelLink = await toPaymentGateway(orderId)
        window.location.href = travelLink;
    }

    return (
        <>
            <Header />
            <div className="detail-section">

                <div className="detail-left">
                    <div className="detail-img-box">
                        <img src={product.detailUrl} alt="product-image" />
                    </div>

                    <div className="detail-btns">
                        <button className="add-cart" onClick={() => { addItToCart(product, product.quantity) }}>ADD TO CART</button>
                        <button className="buy-now" onClick={() => buyThisProduct(product.price.cost)}> {loading ? <div className="spinner-border text-light spinner-border-m" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                            :
                            <p>BUY NOW</p>
                        }</button>
                    </div>
                </div>

                <div className="detail-right">
                    <div className="detail-right-upper-part">
                        <p className="p-title">{product.title.longTitle}</p>

                        <div className="rating-box">
                            <p>2,537 Rating & 12 reviews</p>
                            <img style={{ width: 90, padding: 10 }} src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_9e47c1.png" alt="" />
                        </div>

                        <div className="special-price">
                            <p style={{ fontWeight: 600, fontSize: "14px", color: 'green' }}>Special price</p>
                            <div className="product-price">
                                <p className="price-cost">₹{product.price.cost}</p>
                                <p className="price-mrp">₹{product.price.mrp}</p>
                                <p className="price-discount">{product.price.discount} off</p>
                            </div>
                        </div>

                        <p className='offer-title'>Coupons for you</p>

                        <div style={{ display: 'flex', alignItems: "center" }} className="offer-list">
                            <img style={{ height: "1.5rem", padding: "0.2rem" }} src="https://rukminim2.flixcart.com/www/36/36/promos/30/07/2019/79f48e86-8a93-46ab-b45a-5a12df491941.png?q=90" alt="" />
                            <p>Partner OfferBuy this & Get 5% off upto ₹750 on furniture, Only for you!</p>
                        </div>

                        <p style={{ marginTop: "1rem" }} className="offer-title">Available Offers</p>

                        <div className="offer-list">
                            <div className="offer-list-offer">
                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" />
                                <p>Bank Offer 5% cashback on Axis Bank Flipkart Debit Card</p>
                            </div>
                            <div className="offer-list-offer">
                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" />
                                <p>Bank OfferFlat 10% instant discount upto ₹1250, on MOV of ₹10,000T&C</p>
                            </div>
                            <div className="offer-list-offer">
                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" />
                                <p>Bank Offer5% cashback on Axis Bank Flipkart Debit Card up to ₹750T&C</p>
                            </div>
                            <div className="offer-list-offer">
                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" />
                                <p>Bank OfferExtra ₹500 off on RBL CC EMI Transactions, Min Txn Value ₹24,990 and aboveT&C</p>
                            </div>
                        </div>
                    </div>
                    <div className="detail-right-lower-part">
                        <h3>Ratings & Reviews</h3>
                        <div className="rating-graphs">
                            <div className="graph-left-section">
                                <p>{product.averageRating} <i className="fa-solid fa-star"></i></p>
                                <p> {product.numOfReviews} Ratings & {product.numOfReviews} Reviews</p>
                            </div>
                            <div className="graph-right-section">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div className="rating-bar-row" key={star}>
                                        <p className="star-label">{star} <span className="star-symbol">★</span></p>
                                        <div className="bar-container">
                                            <div
                                                className="bar-fill"
                                                style={{
                                                    width: `${totalReviews ? (ratingCounts[star] / totalReviews) * 100 : 0}%`,
                                                    backgroundColor: star >= 3 ? "#388e3c" : (star === 2 ? "#ff9f00" : "#ff6161")
                                                }}
                                            ></div>
                                        </div>
                                        <p className="review-count">{ratingCounts[star]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="all-reviews">
                            {product.reviews.map((review) => (
                                <React.Fragment key={review._id}>
                                    <div className="review">
                                        <div className="rating-top">
                                            <div className="rating-heading">
                                                <p>{review.rating} <i className="fa-solid fa-star fa-2xs"></i></p>
                                                <p>{review.title} </p>
                                            </div>
                                            {review.user === user?._id
                                                ?
                                                <div className="rating-edit">
                                                    <p onClick={() => editReview()}>Edit</p>
                                                    <p onClick={() => deleteReview()}>Delete</p>
                                                </div>
                                                :
                                                <></>
                                            }
                                        </div>
                                        <p>{review.description}</p>
                                        <p>by @{review.name}</p>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default DetailPage