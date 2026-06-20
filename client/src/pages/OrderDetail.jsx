import "./css/OrderDetail.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SingleOrderApi } from "../service/Api";

const OrderDetail = () => {
    const navigate = useNavigate();

    const [order, setOrder] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const getOrder = async () => {
            const order = await SingleOrderApi(id)
            setOrder(order)
        }
        getOrder();
    }, [id])

    if (!order) {
        return <><p>Loading....</p></>
    }

    return (
        <>
            <Header />
            <div className="order-details-page">
                <div className="order-details-left">
                    <>
                        <div className="order-box">
                            <div className="order-header">
                                <div>
                                    <p className="order-id">Order ID</p>
                                    <p className="order-value">{order._id}</p>
                                </div>
                                <div>
                                    <p className="order-id">Ordered On</p>
                                    <p className="order-value">
                                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short"
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="order-id ">Status</p>
                                    <span className={`order-status ${order.status.toLowerCase()} order-status`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="order-box">
                            <h3 className="section-title">Items in this order</h3>

                            {order.items.map((item) => (
                                <div className="order-item" key={item.productId}>
                                    <img src={item.productImg} alt="product" />

                                    <div className="item-details">
                                        <p className="item-name">{item.productName}</p>
                                        <p className="item-qty">Qty: {item.quantity}</p>
                                        <p className="item-price">₹{item.price}</p>
                                    </div>

                                    <div className="item-total">
                                        ₹{item.price * item.quantity}
                                        <Link to={`/product/review/${item.productId}` } style={{all:"unset"}}>
                                            <p>Review</p>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-box">
                            <h3 className="section-title">Delivery Address</h3>
                            <p className="address-name">{order.user.name}</p>
                            <p>{order.user.email}</p>
                            <p>{order.user.mobile}</p>
                        </div>
                    </>
                </div>

                <div className="order-details-right">
                    <div className="order-box">
                        <h3 className="section-title">Price Details</h3>

                        <div className="price-row">
                            <p>Items Price</p>
                            <p>₹{order.totalPrice}</p>
                        </div>

                        <div className="price-row">
                            <p>Delivery Charges</p>
                            <p className="green">FREE</p>
                        </div>

                        <div className="price-row total">
                            <p>Total Amount</p>
                            <p>₹{order.totalPrice}</p>
                        </div>
                    </div>

                    <div className="order-box">
                        <h3 className="section-title">Payment Information</h3>
                        <p>
                            Payment Status:
                            <span className={`payment ${order.paymentDetails.status.toLowerCase()}`}>
                                {order.paymentDetails.status}
                            </span>
                        </p>
                        {order.paymentDetails.paymentId && (
                            <p>Payment ID: {order.paymentDetails.paymentId}</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OrderDetail;