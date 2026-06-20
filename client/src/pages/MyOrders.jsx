import "./css/myOrders.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { OrderApi } from "../service/Api";
import { useSelector } from "react-redux";

const MyOrders = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const [allOrders, setAllOrders] = useState([]);
    let orderNumber = 0;

    useEffect(() => {
        const fetchUserOrders = async () => {
            const id = user?._id;
            const orders = await OrderApi(id);
            setAllOrders(orders);
        };
        fetchUserOrders();
    }, []);

    if (!user?._id) return <>Loading....</>

    return (
        <>
            <Header />
            {allOrders.length > 0 ? (
                <div className="order-container">
                    <div className="my-orders">
                        {allOrders.map((order) => (
                            <div className="order-card" key={order._id} onClick={() => navigate(`/order/${order._id}`)}>
                                <div className="order-image">
                                    <img src="https://cdn-icons-png.flaticon.com/128/2979/2979677.png" alt="product" />
                                </div>

                                <div className="order-details">
                                    <div className="order-product-title">
                                        <p>Order No {orderNumber += 1}</p>
                                    </div>

                                    <div className="order-price">
                                        ₹{order.totalPrice}
                                    </div>

                                    <div className="order-meta">
                                        Order ID: {order._id}
                                    </div>
                                </div>

                                <div className="order-status">
                                    <p className={`status ${order.status?.toLowerCase()}`}>
                                        ● {order.status}
                                    </p>

                                    <p className="order-date">
                                        Ordered on {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                            month: "short",
                                            day: "numeric"
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="cart-page">
                    <div className="empty-cart">
                        <div className="empty-cart-image">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/7466/7466065.png"
                                alt="empty"
                            />
                        </div>

                        <div className="empty-cart-text">
                            <p>You have no Orders</p>
                            <p>Add items to it now.</p>
                        </div>

                        <div className="empty-cart-buttons">
                            <Link to="/cart">
                                <button>Shop now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default MyOrders;