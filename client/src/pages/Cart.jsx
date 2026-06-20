import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import "./css/cart.css"
import Footer from '../components/Footer/Footer'
import { useDispatch, useSelector } from "react-redux"
import { placeOrderApi, toPaymentGateway } from '../service/Api'
import { useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart } from '../redux/features/CartSlice'

const Cart = () => {

  let totalQuantity = 0
  const { user, authenticated } = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);

  const [cartCalculations, setCartCalculations] = useState({
    totalCost: 0,
    totalDiscount: 0,
    totalMrp: 0
  })

  const { cartItems } = useSelector(state => state.cart)

  useEffect(() => {
    let totalCost = 0
    let totalDiscount = 0
    let totalMrp = 0

    cartItems.forEach((product) => {
      totalCost = product.price.cost * product.quantity + totalCost
      totalMrp = product.price.mrp * product.quantity + totalMrp
      totalDiscount = totalMrp - totalCost
    })

    setCartCalculations(prev => ({
      ...prev,
      totalCost: totalCost,
      totalDiscount: totalDiscount,
      totalMrp: totalMrp
    }))

  }, [cartItems])

  const placeOrder = async () => {
    const isauthenticated = authenticated
    if (!isauthenticated) {
      return
    }
    setLoading(true);
    const orderId = await placeOrderApi(cartItems, cartCalculations.totalCost, user._id)
    const travelLink = await toPaymentGateway(orderId)
    window.location.href = travelLink
  };

  const removeCartItem = (id) => {
    dispatch(removeFromCart(id))
  }


  const changeQuantity = (e, product) => {
    if (e.target.name === "add") {
      dispatch(addToCart({ product: product, quantity: product.quantity + 1 }))
    } else {
      if (product.quantity <= 1) {
        return
      }
      dispatch(addToCart({ product: product, quantity: product.quantity - 1 }))
    }
  }

  return (
    <>
      <Header />
      {
        cartItems.length > 0 ?
          (
            <div className="cart-page-wrapper">
              <div className="product-cart">
                <div className="cart-left">
                  <div className="delivery-address">
                    <div className="address-label">
                      <p>Deliver to: <strong>Dharamasala - 176215</strong></p>
                    </div>
                    <button className="change-btn">Change</button>
                  </div>
                  <div className="cart-prodcuts">

                    {cartItems.map((product) => {
                      return (
                        <React.Fragment key={product._id}>
                          <div className="cart-product">
                            <div className="cart-product-image">
                              <img src={product.detailUrl} alt="product-image" />
                            </div>
                            <div className="cart-product-details">
                              <p className='product-title'>{product.title.longTitle}</p>
                              <div className="seller-info">
                                <p>Seller:SURASHAS</p>
                                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_9e47c1.png" alt="assured" />
                              </div>
                              <div className="price-of-product">
                                <span className='original-price'>{product.price.mrp}</span>
                                <span className='discounted-price'>{product.price.cost}</span>
                                <span className='discount-percentage'>{product.price.discount} Off</span>
                              </div>
                              <span className='offers-applied'>2 offers applied</span>
                            </div>
                            <div className="delivery-date">
                              <p>Delivery by Tue Dec 9</p>
                            </div>
                          </div>
                          <div className="cart-product-buttons">
                            <div className="quantity-buttons">
                              <button name='sub' onClick={(e) => changeQuantity(e, product)}>-</button>
                              <input type="text" value={product.quantity} readOnly />
                              <button name='add' onClick={(e) => changeQuantity(e, product)}>+</button>
                            </div>
                            <button className="action-btn" onClick={() => removeCartItem(product._id)}>REMOVE</button>
                          </div>
                        </React.Fragment>
                      )
                    })}
                  </div>
                  <div className="order-placement-button">
                    <button onClick={() => placeOrder()}> {loading ? <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                      :
                      <p>PLACE ORDER</p>
                    }</button>
                  </div>
                </div>

                <div className="cart-right">
                  <div className="price-heading">
                    <p>PRICE DETAILS</p>
                  </div>
                  <div className="price-calculations">
                    <div className="cart-price-calculation">
                      {cartItems.forEach((product) => {
                        totalQuantity = totalQuantity + product.quantity
                      })}
                      <p>Price ({totalQuantity} {totalQuantity <= 1 ? "item" : "items"})</p>
                      <p>₹{cartCalculations.totalMrp}</p>
                    </div>
                    <div className="cart-price-calculation">
                      <p>Discount</p>
                      <p className='cart-green'>- ₹{cartCalculations.totalDiscount}</p>
                    </div>
                    <div className="cart-price-calculation">
                      <p>Delivery Charges</p>
                      <p className='cart-green'>Free</p>
                    </div>
                  </div>
                  <div className="total-amount-calculated cart-price-calculation">
                    <p>Total Amount</p>
                    <p>₹{cartCalculations.totalCost}</p>
                  </div>
                  <div className="saving-by-customer cart-green">
                    <p>You will save ₹{cartCalculations.totalDiscount} on this order</p>
                  </div>
                  <div className="safe-payment">
                    <div className="icon-shield">
                      <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/shield_b33c0c.svg" alt="shield" />
                    </div>
                    <p>Safe and Secure Payments.Easy returns.100% Authentic products.</p>
                  </div>
                </div>
              </div>
            </div>
          )
          :
          (<div className="cart-page">
            <div className="empty-cart">
              <div className="empty-cart-image">
                <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" />
              </div>
              <div className="empty-cart-text">
                <p>Your cart is empty!</p>
                <p>Add items to it now.</p>
              </div>
              <div className="empty-cart-buttons">
                <button onClick={() => navigate("/")}>Shop now</button>
              </div>
            </div>
          </div>)
      }
      <Footer />
    </>
  )
}

export default Cart