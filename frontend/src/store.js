import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; 
import {composeWithDevTools} from 'redux-devtools-extension';
import {productReducer, productDetailsReducer} from "./reducers/productReducers";
import {authReducer, userReducer, forgotPasswordReducer} from "./reducers/userReducer" ;
import { cartReducer } from './reducers/cartReducers';

import {newOrderReducer} from "./reducers/orderReducers"

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer
})

let initalState = {
    cart:{
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [], 
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            :{}
    }
};

const middleware = [thunk];
const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))
export default store; 