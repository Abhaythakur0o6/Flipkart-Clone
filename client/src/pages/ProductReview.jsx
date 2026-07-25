import { useEffect, useState } from 'react';
import './css/ProductReview.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../redux/features/ProductSlice';
import { SubmitReview, SubmitReviewChanges } from '../service/Api';
import { useDataContextProvider } from '../context/DataProvider';
import toast from 'react-hot-toast';

const ProductReview = () => {

    const navigate = useNavigate()

    const { reviewForm, setReviewForm } = useDataContextProvider()

    const [loading, setLoading] = useState(false)

    const [userReview, setUserReview] = useState({
        rating: 5,
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
        if (!userReview.title.trim()) {
            toast.error('Please enter a review title')
            return
        }
        if (!userReview.description.trim()) {
            toast.error('Please enter a review description')
            return
        }
        try {
            setLoading(true)
            await SubmitReview(userReview, productId)
            toast.success('Review submitted!')
            navigate(`/product/${productId}`)
        } catch (error) {
            toast.error(error.message || 'Failed to submit review')
        } finally {
            setLoading(false)
        }
    }

    const submitReviewChanges = async () => {
        if (!userReview.title.trim()) {
            toast.error('Please enter a review title')
            return
        }
        if (!userReview.description.trim()) {
            toast.error('Please enter a review description')
            return
        }
        try {
            setLoading(true)
            await SubmitReviewChanges(userReview, productId)
            toast.success('Review updated!')
            navigate(`/product/${productId}`)
        } catch (error) {
            toast.error(error.message || 'Failed to update review')
        } finally {
            setLoading(false)
        }
    }

    if (!product.title) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
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
                                    <button className="fk-submit-btn" onClick={() => submitReviewChanges()} disabled={loading}>
                                        {loading ? <div className="spinner-border text-light spinner-border-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : "Save Changes"}
                                    </button>
                                    :
                                    <button className="fk-submit-btn" onClick={() => submitReview()} disabled={loading}>
                                        {loading ? <div className="spinner-border text-light spinner-border-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : "Submit"}
                                    </button>
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