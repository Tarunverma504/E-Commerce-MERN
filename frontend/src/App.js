import { useEffect, useState} from 'react';

import { BrowserRouter as Router,Route } from 'react-router-dom';

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from './components/user/Login';

import {loadUser} from './actions/userActions';
import store from './store';

import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';

import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from "./components/cart/OrderSuccess" 


import ProtectedRoute from './components/route/ProtectedRoute'; 
import axios from 'axios';

//Payment
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'; 


function App() {


  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(()=>{
    store.dispatch(loadUser())
    async function getStripeApiKey(){
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey) ;
    }

    getStripeApiKey()
  },[])

  return (
      <Router>
        <div className="App">
          <Header/>
          <div className="container container-fluid">
            <Route exact path = '/' component={Home} />
            <Route  path = '/search/:keyword' component={Home} />
            <Route exact path = '/product/:id' component={ProductDetails} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/password/forgot' component={ForgotPassword} />
            <Route path='/password/reset/:token' component={NewPassword} />
            <Route exact path = '/cart' component={Cart} />

            <ProtectedRoute exact path = '/shipping' component={Shipping} />
            <ProtectedRoute exact path = '/order/confirm' component={ConfirmOrder} />
            <ProtectedRoute exact path = '/success' component={OrderSuccess} />


            {stripeApiKey && 
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute exact path='/payment' component={Payment} />
              </Elements>
            }

            <ProtectedRoute path='/me' component={Profile} exact />
            <ProtectedRoute path='/me/update' component={UpdateProfile} exact />
            <ProtectedRoute path='/password/update' component={UpdatePassword } exact />



          </div>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;
