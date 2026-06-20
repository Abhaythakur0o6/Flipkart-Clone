import React from 'react'
import "./css/orderSuccess.css"
import Header from '../components/Header/Header'
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className="success-wrapper">
                <div className="success-card">
                    <div className="success-icon">
                        <img src="https://cdn-icons-png.flaticon.com/512/3081/3081648.png" alt="" />
                    </div>

                    <h1 className="success-title">Order Placed Successfully!</h1>
                    <p className="success-subtitle">
                        Thank you for shopping with us. Your order has been confirmed.
                    </p>

                    <div className="delivery-box">
                        <p><strong>Estimated Delivery:</strong> 3–5 Business Days</p>
                        <p><strong>Payment Status:</strong> Paid ✅</p>
                    </div>

                    <div className="success-buttons">
                        <button
                            className="orders-btn"
                            onClick={() => navigate("/my-orders")}
                        >
                            Go to My Orders
                        </button>

                        <button
                            className="shop-btn"
                            onClick={() => navigate("/")}
                        >
                            Continue Shopping
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default OrderSuccess
