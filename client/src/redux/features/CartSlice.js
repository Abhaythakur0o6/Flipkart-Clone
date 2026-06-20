import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// Add Product To Cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ product, quantity }) => {
        return { ...product, quantity }
    }
)


// Slice For Single Product ------------------------------------------>
const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
        loading: false,
        error: null
    },
    reducers: {
        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter(items => items._id !== action.payload)
            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            )
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                const existingItem = state.cartItems.find(cartItem => cartItem._id === action.payload._id)
                if (existingItem) {
                    existingItem.quantity = action.payload.quantity;
                }
                else {
                    state.cartItems.push(action.payload)
                }
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(state.cartItems)
                )
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export const { removeFromCart } = CartSlice.actions;
export default CartSlice.reducer