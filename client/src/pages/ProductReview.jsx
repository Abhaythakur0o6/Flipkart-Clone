import { useEffect, useState } from 'react';
import './css/ProductReview.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../redux/features/ProductSlice';
import { SubmitReview, SubmitReviewChanges } from '../service/Api';
import { useDataContextProvider } from '../context/dataProvider';

const ProductReview = () => {

    const navigate = useNavigate()

    const { reviewForm, setReviewForm } = useDataContextProvider()

    const [userReview, setUserReview] = useState({
        rating: 1,
        title: "",
        description: ""
    })

    const params = useParams()
    const dispatch = useDispatch()
    const productId = params.id

    useEffect(() => {
        dispatch(fetchProductDetail(productId))
    }, [dispatch])


    const { product } = useSelector(state => state.products)

    const submitReview = async () => {
        const review = await SubmitReview(userReview, productId)
        navigate(`/product/${productId}`)
    }

    const submitReviewChanges = async () => {
        const review = await SubmitReviewChanges(userReview, productId)
        navigate(`/product/${productId}`)
    }

    if (!product.title) {
        return <p>...Loading</p>
    }

    return (
        <>
            <Header />
            <div className="fk-write-review-page">
                <div className="fk-container">
                    <div className="fk-card">
                        <div className="fk-card-header">
                            <h2>Rate this product</h2>
                            <div className="fk-product-summary">
                                <div className="fk-product-thumb">
                                    <img src={product.detailUrl} alt="Product Image" />
                                </div>
                                <span className="fk-product-name">{product.title.shortTitle}</span>
                            </div>
                        </div>

                        <div className="fk-form-section">
                            <div className="fk-input-group">
                                <label>Your Rating</label>
                                <fieldset className="starability-basic">
                                    <input type="radio" id="rate1" name="rating" value="1" onChange={(e) => setUserReview((prev) => ({ ...prev, rating: Number(e.target.value) }))} />
                                    <label htmlFor="rate1" title="1 stars"></label>
                                    <input type="radio" id="rate2" name="rating" value="2" onChange={(e) => setUserReview((prev) => ({ ...prev, rating: Number(e.target.value) }))} />
                                    <label htmlFor="rate2" title="2 stars"></label>
                                    <input type="radio" id="rate3" name="rating" value="3" onChange={(e) => setUserReview((prev) => ({ ...prev, rating: Number(e.target.value) }))} />
                                    <label htmlFor="rate3" title="3 stars"></label>
                                    <input type="radio" id="rate4" name="rating" value="4" onChange={(e) => setUserReview((prev) => ({ ...prev, rating: Number(e.target.value) }))} />
                                    <label htmlFor="rate4" title="4 stars"></label>
                                    <input type="radio" id="rate5" name="rating" value="5" onChange={(e) => setUserReview((prev) => ({ ...prev, rating: Number(e.target.value) }))} />
                                    <label htmlFor="rate5" title="5 star"></label>
                                </fieldset>
                            </div>
                            <div className="fk-input-group">
                                <label htmlFor="reviewTitle">Review Title</label>
                                <input
                                    type="text"
                                    id="reviewTitle"
                                    placeholder="Example: Awesome product, Value for money..."
                                    value={userReview.title}
                                    onChange={(e) => setUserReview((prev) => ({
                                        ...prev,
                                        title: e.target.value
                                    }))}
                                />
                            </div>

                            <div className="fk-input-group">
                                <label htmlFor="reviewDescription">Description</label>
                                <textarea
                                    id="reviewDescription"
                                    placeholder="Share your detailed opinion about the product. What did you like or dislike?"
                                    rows="6"
                                    value={userReview.description}
                                    onChange={(e) => setUserReview((prev) => ({
                                        ...prev,
                                        description: e.target.value
                                    }))}
                                />
                            </div>
                            <div className="fk-form-actions">
                                {reviewForm
                                    ?
                                    <button className="fk-submit-btn" onClick={() => submitReviewChanges()}>Save Changes</button>
                                    :
                                    <button className="fk-submit-btn" onClick={() => submitReview()}>Submit</button>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="fk-tips-section">
                        <h3>What makes a good review?</h3>
                        <div className="fk-tips-list">
                            <div className="fk-tip-item">
                                <h4>Have you used this product?</h4>
                                <p>Your review should be about your experience with the product.</p>
                            </div>
                            <div className="fk-tip-item">
                                <h4>Why review a product?</h4>
                                <p>Your valuable feedback will help your fellow shoppers decide!</p>
                            </div>
                            <div className="fk-tip-item">
                                <h4>How to write a good review?</h4>
                                <p>Include usage details, pros and cons, and specifics about performance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductReview
