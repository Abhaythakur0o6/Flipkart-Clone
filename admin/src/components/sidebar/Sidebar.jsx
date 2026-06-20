import { useNavigate } from "react-router-dom"
import "./Sidebar.css"
const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="sidebar">
                <div className="logo-section">
                    <img src="https://images.seeklogo.com/logo-png/39/2/flipkart-logo-png_seeklogo-397718.png" alt="img" />
                    <p>Admin</p>
                </div>
                <div className="sidebar-sections">
                    <div className="sidebar-section" onClick={() => navigate("/")}>
                        <img src="https://cdn-icons-png.flaticon.com/128/7177/7177996.png" alt="" />
                        <p>Products</p>
                    </div>
                    <div className="sidebar-section" onClick={() => navigate("/add-products")} >
                        <img src="https://cdn-icons-png.flaticon.com/128/3024/3024515.png" alt="" />
                        <p>Add Product</p>
                    </div>
                    <div className="sidebar-section" onClick={() => navigate("/orders")} >
                        <img src="https://cdn-icons-png.flaticon.com/128/6734/6734859.png" alt="" />
                        <p>orders</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar