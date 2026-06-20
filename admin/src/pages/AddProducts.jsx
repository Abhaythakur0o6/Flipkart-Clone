import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import Form from '../components/form/Form'
import "./css/AddProduct.css"

const AddProducts = () => {
    return (
        <>
            <div className="add-product-page">
                <Sidebar />
                <div className="add-product-main-page">
                    <Navbar heading={"Add Product"} />
                    <Form />
                </div>
            </div>
        </>
    )
}

export default AddProducts