import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; 
import {composeWithDevTools} from 'redux-devtools-extension';
import {productReducer, productDetailsReducer} from "./reducers/productReducers";
import {authReducer} from "./reducers/userReducer" 
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    auth: authReducer
})

let initalState = {};

const middleware = [thunk];
const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))
export default store; 