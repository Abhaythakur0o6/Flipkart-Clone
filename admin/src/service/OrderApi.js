import axios from "axios"

const URL = import.meta.env.VITE_API_URL;

//For All Orders
export const OrderList = async (queryString) => {
    const res = await axios.get(`${URL}/allorders?${queryString}`)
    return res.data;
}

//To Add Product
export const AddProduct = async (formData) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${URL}/addproduct`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { "Authorization": `Bearer ${token}` })
        }
    })
    return res.data;
}

//For All Products
export const AllProducts = async (queryString) => {
    const res = await axios.get(`${URL}/allproducts?${queryString}`)
    return res.data
}

//For Deletion
export const DeleteProduct = async (id) => {
    const res = await axios.delete(`${URL}/deleteproduct/${id}`)
    return res.data.product
}