import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Sidebar = ({ setSidebar, sidebar, logout, toggleForm }) => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)

    const handleOrdersClick = () => {
        if (!user?._id) {
            toast.error("Please login first to view your orders! 🔒")
            return
        }
        navigate("/my-orders")
    }

    return (
        <>
            <div className="mainpage-sidebar">
                <div className="mainpage-sidebar-header">
                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828859.png" className="mobile-menu" alt="menu-icon" onClick={() => setSidebar(!sidebar)} />
                    <img src="https://images.seeklogo.com/logo-png/62/2/flipkart-logo-png_seeklogo-622636.png" title="Flipkart"></img>
                </div>

                <div className="mainpage-sidebar-items">
                    {user
                        ?
                        <a onClick={() => logout()} className="dropdown-item" href="#"><img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/logout-e63ddf.svg" alt="" /> Log Out</a>
                        :
                        <div onClick={toggleForm} className="mainpage-sidebar-login">
                            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" alt="" />
                            <p>Login</p>
                        </div>
                    }

                    <div className="mainpage-sidebar-cart" onClick={() => navigate("/cart")}>
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg" alt="" />
                        <p>Cart</p>
                    </div>

                    <li className="mainpage-sidebar-dropdown-item" onClick={handleOrdersClick} style={{ cursor: "pointer" }}>
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/orders-bfe8c4.svg" alt="" /> Orders
                    </li>
                </div>
            </div>
        </>
    )
}

export default Sidebar
