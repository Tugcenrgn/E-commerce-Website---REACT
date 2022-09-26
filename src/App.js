import { Link } from "react-router-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomeScreen from "./pages/homeScreen"
import ProductScreen from "./pages/productScreen";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from "react-router-bootstrap";
import "./App.css"
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./pages/cartScreen";
import SigninScreen from "./pages/signinScreen";
import AdminScreen from "./pages/adminScreen";
import AdminRoute from "./components/adminRoute";

function App() {
  const {state} = useContext(Store);
  const {cart} = state;
  return (
    <BrowserRouter>
    <div className="app">
      <header>
        <div className="navbar-container" >
          <div className="navbar">
            <Link to="/">
              <div className="navbar-brand">Shoppinol</div>
            </Link>

            <div className="navbar-end">
              
              <Link to="/cart" className="nav-cart">
                <i className="fa fa-cart-plus cart-icon"></i>{' '}
                Cart
                {cart.cartItems.length > 0 && (
                  <div className="cart-badge">{cart.cartItems.reduce((a,c) => a + c.quantity, 0)}</div>
                )}
              </Link>
           
              <Link className="nav-admin" to="/admin">
                Admin
              </Link>
            </div>

          </div> 
        </div> 
      </header>
      <main>
        <div className="container">
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen/>}/>
            <Route path="/cart" element={<CartScreen/>}/>
            <Route path="/signin" element={<SigninScreen/>}/>
            {/*<AdminRoute><AdminScreen/></AdminRoute> */}
            <Route path="/admin" element={<AdminScreen/>}/>
            <Route path="/" element= {<HomeScreen/>}/>
          </Routes>
        </div>   
      </main>

      <div className="footer">
          <div className="footer-header">All Rights Reserved</div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
