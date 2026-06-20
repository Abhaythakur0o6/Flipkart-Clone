import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../service/AxiosInstance"

//FETCH ALL PRODUCTS
export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (queryString) => {
        const res = await axiosInstance.get(`/allproducts`)
        return res.data;
    }
)

//CATEGORY PRODUCTS
export const fetchCategoryProducts = createAsyncThunk(
    "products/fetchCategoryProducts",
    async (queryString) => {
        const res = await axiosInstance.get(`/allproducts?${queryString || ""}`);
        return res.data;
    }
)

//GET SINGLE PRODUCT
export const fetchProductDetail = createAsyncThunk(
    "products/fetchDetail",
    async (id) => {
        const res = await axiosInstance.get(`/product/${id}`)
        return res.data.singleProduct;
    }
)

/* -------------- SLICE ------------------ */

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        categoryProducts: [],
        pagination: null,
        product: {},
        loadingProducts: false,
        loadingProduct: false,
        error: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            // all products
            .addCase(fetchProducts.pending, (state) => {
                state.loadingProducts = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loadingProducts = false;
                state.products = action.payload.allProducts;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loadingProducts = false;
                state.error = action.error.message;
            })

            // single product
            .addCase(fetchProductDetail.pending, (state) => {
                state.loadingProduct = true;
                state.error = null;
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.loadingProduct = false;
                state.product = action.payload;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.loadingProduct = false;
                state.error = action.error.message;
            })

            //Category Products 
            .addCase(fetchCategoryProducts.fulfilled,
                (state, action) => {
                    state.loadingProducts = false;
                    state.categoryProducts = action.payload.allProducts;
                    state.pagination = action.payload.pagination;
                })
    }
});

export default productSlice.reducer;