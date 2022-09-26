import { useContext } from "react";
import { Store } from "../Store";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import './cartScreen.css';


export default function CartScreen(){
    const navigate = useNavigate();
    const {state, dispatch: contextDispatch} =  useContext(Store);
    const { cart: {cartItems}, } = state;
    
    const updateCartHandler = async(item, quantity) => {
        const {data} = await axios.get(`/api/products/${item._id}`);
        
        if(data.stock < quantity){
            window.alert('This product is out of stock');
            return;
          }
  
          contextDispatch({type: 'CART_ADD_ITEM', payload: {...item, quantity},});
    }

    const removeItemHandler = (item) => {
        contextDispatch({type: 'CART_REMOVE_ITEM', payload: item});

    }
    
    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    };

    return (
        <div className="cart-container">
            <title>Cart</title>
            <h1>Shopping Cart</h1>
            <div className="cart-row">
                <div className="cart-col-8">
                    {cartItems.length === 0 ? (
                        <div className="cart-alert">
                            Cart is empty
                            <Link to="/">Go Shopping</Link>
                        </div>
                    ): 
                    (
                        <div className="cart-list">
                            {cartItems.map((item) => (
                                <div className="cart-list-item" key={item._id}>
                                    <div className="cart-list-row">
                                        <div className="cart-list-col-4-1">
                                            <img src={item.image} alt={item.name} className="cart-item-img"/>
                                            {' '}
                                            <Link className="item-name" to={`/product/${item.slug}`}>{item.name}</Link>
                                        </div>

                                        <div className="cart-list-col-3">
                                            <button 
                                            className="btn-minus"
                                            onClick={() => updateCartHandler(item, item.quantity - 1)}
                                            disabled={item.quantity === 1}>
                                                <i className="fas fa-minus-circle"/>
                                            </button>{' '}
                                            <span>{item.quantity}</span>{' '}
                                            <button 
                                            className="btn-plus"
                                            onClick={() => updateCartHandler(item, item.quantity + 1)}
                                            disabled={item.quantity === item.stock}>
                                                <i className="fas fa-plus-circle"/>
                                            </button>
                                        </div>

                                        <div className="cart-list-col-3">${item.price}</div>
                                        <div className="cart-list-col-2">
                                            <button className=" btn-trash" onClick={() => removeItemHandler(item)}>
                                                <i className="fas fa-trash"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                    }
                </div>
                <div className="cart-col-4">
                    <div className="cart-action-card">
                        <div className="card-body">
                            <div className="card-list">
                                <div className="card-list-item">
                                    <h3>
                                        Total ({cartItems.reduce((a,c) => a + c.quantity, 0)}{' '} items) : 
                                        $ {cartItems.reduce((a,c) => a + c.price * c.quantity,0)}
                                    </h3>
                                </div>

                                <div className="card-list-item">
                                    <div className="list-item-grid">
                                        <button 
                                        className="checkout-button"
                                        onClick={checkoutHandler}
                                        disabled={cartItems.length === 0}>
                                            Checkout
                                        </button>
                                    </div>
                                </div>

                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}