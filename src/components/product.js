import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './product.css';
import Rating from "./rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

export default function Product(props){
    const {product} = props;
    const {state, dispatch: contextDispatch} =  useContext(Store);
    const { cart: {cartItems}, } = state;


    const addToCartHandler = async(item) => {
      const existItem = cartItems.find((x)=> x._id === product._id);
      const quantity = existItem ? existItem.quantity+1 : 1;

      const {data} = await axios.get(`/api/products/${item._id}`);
      
      if(data.stock < quantity){
          window.alert('This product is out of stock');
          return;
        }

        contextDispatch({type: 'CART_ADD_ITEM', payload: {...item, quantity},});
  }
    return (
        <div className="product"> 
        {/*key={product.slug}*/}

        <Link to={`/product/${product.slug}`}>
          <img className="product-image" src={product.image} alt={product.name}/>
        </Link>

        <div className="product-info">
          <Link to={`/product/${product.slug}`}
          className="product-info-text">
            <p className="product-info-text">{product.name}</p>
          </Link>
          <Rating rating={product.rating} reviews={product.reviews}/>
          <p>
            <strong>${product.price}</strong>
          </p>
          {product.stock === 0 ? (<button disabled={product.stock === 0}> Out of Stock</button>) :
          (<button onClick={()=> addToCartHandler(product)} className="button-cart" >Add to cart</button>)
      
          }
        </div>
      </div>
    );
}