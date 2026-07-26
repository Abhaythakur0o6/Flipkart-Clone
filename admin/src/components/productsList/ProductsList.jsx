import React, { useState, useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import { DeleteProduct, UpdateOrderStatus } from "../../service/OrderApi";
import { useSearchParams } from "react-router-dom";
import "./ProductList.css"

const ProductsList = ({ list, orderColumns, products, orders, totalPages, totalProducts }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const { setProducts } = useProductContext()

    // Modal state
    const [modalOrderId, setModalOrderId] = useState(null);
    const [loadingId, setLoadingId] = useState(null);
    // Tracks locally updated statuses: { orderId: newStatus }
    const [statusMap, setStatusMap] = useState({});

    // Reset overrides whenever the page changes
    useEffect(() => {
        setStatusMap({});
    }, [page]);

    const deleteProduct = async (id) => {
        const product = await DeleteProduct(id)
        setProducts(prev => prev.filter(product => product._id != id))
    }

    const changeParams = (type) => {
        if (type == "prev" && page > 1) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", page - 1);
            setSearchParams(newParams);
        }

        if (type == "next" && page < totalPages) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", Number(page) + 1);
            setSearchParams(newParams);
        }
    }

    const openModal = (orderId) => {
        setModalOrderId(orderId);
    }

    const closeModal = () => {
        setModalOrderId(null);
    }

    const handleStatusChange = async (newStatus) => {
        const targetId = modalOrderId;
        setLoadingId(targetId);
        try {
            const data = await UpdateOrderStatus(targetId, newStatus);
            if (data.success) {
                setStatusMap(prev => ({ ...prev, [targetId]: newStatus }));
            }
        } catch (err) {
            console.error("Failed to update order status:", err);
        } finally {
            setLoadingId(null);
            closeModal();
        }
    }

    const getStatusClass = (status) => {
        if (status === "DELIVERED") return "status delivered";
        if (status === "REJECTED") return "status rejected";
        return "status pending";
    }

    return (
        <>
            {/* Status Change Modal */}
            {modalOrderId && (
                <div className="status-modal-overlay" onClick={closeModal}>
                    <div className="status-modal-card" onClick={(e) => e.stopPropagation()}>
                        <h3 className="status-modal-title">Update Order Status</h3>
                        <p className="status-modal-subtitle">Select new status for this order</p>
                        <div className="status-modal-options">
                            <button
                                className="status-option-btn delivered-btn"
                                onClick={() => handleStatusChange("DELIVERED")}
                                disabled={loadingId === modalOrderId}
                            >
                                Delivered
                            </button>
                            <button
                                className="status-option-btn rejected-btn"
                                onClick={() => handleStatusChange("REJECTED")}
                                disabled={loadingId === modalOrderId}
                            >
                                Rejected
                            </button>
                        </div>
                        <button className="status-modal-close" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="product-list-container">
                <div className="heading-section">
                    <p>All {orderColumns.heading}</p>
                    <p>Showing 4 out of {totalProducts} Products</p>
                </div>
                <div className="products-list">
                    <div className="products-grid header" style={
                        {
                            display: "grid",
                            gridTemplateColumns: orderColumns.grid
                        }
                    }>
                        <span>#</span>
                        <span>{orderColumns.first}</span>
                        <span>{orderColumns.second}</span>
                        <span>{orderColumns.third}</span>
                        <span>{orderColumns.fourth}</span>
                        {orderColumns.fifth
                            ?
                            <span>{orderColumns.fifth}</span>
                            :
                            null
                        }

                    </div>

                    <div className="products-grid row" style={
                        {
                            display: "grid",
                            gridTemplateColumns: orderColumns.grid,
                            gap: "2rem"
                        }
                    }>
                        {products
                            ?
                            products.map((product, i) => (
                                <React.Fragment key={product._id}>
                                    <span>{(page - 1) * limit + i + 1}</span>
                                    <span>{product.title.shortTitle}</span>
                                    <span>{product.category}</span>
                                    <span>{product.price.cost}</span>
                                    {orderColumns.fifth ? <span>{product.quantity}</span> : null}
                                    <button onClick={() => deleteProduct(product._id)} className="status delete">Delete</button>
                                </React.Fragment>
                            ))
                            :
                            orders && orders.map((order, i) => {
                                const displayStatus = statusMap[order._id] || order.status;
                                return (
                                    <React.Fragment key={order._id}>
                                        <span>{(page - 1) * limit + i + 1}</span>
                                        <span>{order._id}</span>
                                        <span>{order.user.name}</span>
                                        <span>{order.totalPrice}</span>
                                        {orderColumns.fifth ? <span>25</span> : null}
                                        <button
                                            className={getStatusClass(displayStatus)}
                                            onClick={() => displayStatus !== "DELIVERED" && displayStatus !== "REJECTED" ? openModal(order._id) : null}
                                            title={displayStatus !== "DELIVERED" && displayStatus !== "REJECTED" ? "Click to update status" : displayStatus}
                                        >
                                            {displayStatus}
                                        </button>
                                    </React.Fragment>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="page-no">
                    <img src="https://cdn-icons-png.flaticon.com/128/271/271220.png" onClick={() => changeParams("prev")} alt="prev" />
                    <input value={page} readOnly />
                    <img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" onClick={() => changeParams("next")} alt="Next" />
                </div>
            </div>
        </>
    )
}

export default ProductsList
