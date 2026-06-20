import "./Css/Header.css"
import { useDataContextProvider } from '../../context/dataProvider';
import { Link } from "react-router-dom"
import Search from './search';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from "../../redux/features/UserSlice";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Header = () => {

    const [sidebar, setSidebar] = useState(false)
    let totalCartQuantity = 0
    const dispatch = useDispatch()
    const { setLoginForm } = useDataContextProvider();

    const { user } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)

    const toggleForm = () => {
        setLoginForm(true)
    }

    const logout = () => {
        dispatch(logOutUser())
    }

    return (
        <>
            {sidebar
                ?
                <Sidebar setSidebar={setSidebar} sidebar={sidebar} logout={logout} toggleForm={toggleForm} />
                :
                <></>
            }
            <div className="header">
                <img src="https://cdn-icons-png.flaticon.com/128/1828/1828859.png" className="mobile-menu" alt="menu-icon" onClick={() => setSidebar(!sidebar)} />
                <Link to={"/"}>
                    <div className="flipkart-logo">
                        <img src="https://images.seeklogo.com/logo-png/62/2/flipkart-logo-png_seeklogo-622636.png" title="Flipkart"></img>
                    </div>
                </Link>
                <Search />
                {user
                    ?
                    <div className="login header-icons">
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" alt="" />
                                <p>{user.name}</p>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <Link to={"/my-orders"} style={{ all: "unset" }}>
                                    <li className="dropdown-item"><img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/orders-bfe8c4.svg" alt="" /> Orders</li>
                                </Link>
                                <li><a onClick={() => logout()} className="dropdown-item" href="#"><img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/logout-e63ddf.svg" alt="" /> Log Out</a></li>
                            </ul>
                        </div>
                    </div>
                    :
                    <div onClick={toggleForm} className="login header-icons">
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" alt="" />
                        <p>Login</p>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                }
                <Link style={{ textDecoration: "none", color: "black" }} to={"/cart"}>
                    <div className="cart header-icons">
                        {cartItems.forEach((product) => {
                            totalCartQuantity = totalCartQuantity + product.quantity
                        })}
                        {totalCartQuantity < 1 ? <></> : <div className="cart-red-icon">{totalCartQuantity}</div>}
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg" alt="" />
                        <p>Cart</p>
                    </div>
                </Link>
                <div className="become-a-seller header-icons">
                    <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg" alt="" />
                    <p>Become a Seller</p>
                </div>
                <div className="more-options">
                    <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_3verticalDots-ea7819.svg" alt="" />
                </div>
            </div>
        </>
    )
}

export default Header