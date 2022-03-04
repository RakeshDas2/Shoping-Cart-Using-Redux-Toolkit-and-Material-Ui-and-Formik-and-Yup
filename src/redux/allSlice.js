import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [],
    cartProducts: localStorage.getItem('cart_products') ? JSON.parse(localStorage.getItem('cart_products')) : [],
    product: {
        itemImage: '',
        itemName: '',
        itemDesc: '',
        itemPrice: '',
        itemQty: 1
    },
    userDetails: localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details')) : [],
    userType: localStorage.getItem('user_type') ? JSON.parse(localStorage.getItem('user_type')) : '',
    index: '',
    navBar:false,

}

export const allSlice = createSlice({
    name: 'finalData',
    initialState,
    reducers: {
        addDataForUserDetails: (state, action) => {
            const findIndexOfUser = state.userDetails.findIndex(ele => {
                return ele.email === action.payload.email
            })
            if (findIndexOfUser === -1) {
                state.userDetails.push(action.payload)
                localStorage.setItem('user_details', JSON.stringify(state.userDetails))
            } else {
                console.log('error');
            }
        },
        updateUserType: (state, action) => {
            state.userType = state.userDetails[action.payload].picked
            localStorage.setItem('user_type', JSON.stringify(state.userType))
        },
        addProduct: (state, action) => {
            const findIndexOfProduct = state.products.findIndex(ele => ele.itemName === action.payload.itemName)
            if (findIndexOfProduct === -1) {
                state.products.push(action.payload)
                localStorage.setItem('products', JSON.stringify(state.products))
            } else {
                console.log('already added');
            }
        },
        addCart: (state, action) => {
            const findIndexInCart = state.cartProducts.findIndex(ele => action.payload.itemName === ele.itemName)
            if (findIndexInCart === -1) {
                state.cartProducts.push(action.payload)
                localStorage.setItem('cart_products', JSON.stringify(state.cartProducts))
            } else {
                console.log('already added');
            }
        },
        updateQty: (state, action) => {
            state.cartProducts[state.index].itemQty = action.payload
            localStorage.setItem('cart_products', JSON.stringify(state.cartProducts))
        },
        updateIndex: (state, action) => {
            state.index = action.payload
        },
        deleteFromCart: (state, action) => {
            state.cartProducts = state.cartProducts.filter((ele, index) => {
                return index !== action.payload
            })
             localStorage.setItem('cart_products',JSON.stringify(state.cartProducts))
        },
        updateNavBar:(state,action)=>{
           state.navBar=action.payload
        },
        deleteFromProducts:(state,action)=>{
            state.products = state.products.filter((ele, index) => {
                return index !== action.payload
            })
             localStorage.setItem('products',JSON.stringify(state.products))
        },
        updateProduct:(state,action)=>{
            state.product=action.payload
        }


    }
})

export const { addDataForUserDetails, updateUserType, addProduct, addCart, updateQty, updateIndex,deleteFromCart,updateNavBar,deleteFromProducts,updateProduct} = allSlice.actions
export default allSlice.reducer
