import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../components/rating";
import { Store } from "../Store";
import './productScreen.css';

const reducer = (state, action) => {
    switch(action.type) {
      case 'FETCH_REQUEST':
        return{...state, loading: true};
      case 'FETCH_SUCCESS':
        return {...state, product: action.payload, loading: false};
      case 'FETCH_FAIL':
        return {...state, loading: false, error: action.payload};
      default:
        return state;
    }
  };

export default function ProductScreen(){
    const navigate = useNavigate();
    const params = useParams();
    const {slug} = params;

  
      const [{loading, error, product}, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
      });
    
      useEffect(() =>{
        const fetchData = async () => {
          dispatch({type:'FETCH_REQUEST'});
          try{ 
            const result = await axios.get(`/api/products/slug/${slug}`);
            dispatch({type:'FETCH_SUCCESS', payload: result.data});
          }catch(err){
            dispatch({type: 'FETCH_FAIL', payload: err.message});
          }
        };
        fetchData();
      }, [slug])

      const {state, dispatch: contextDispatch} = useContext(Store);
      const {cart} = state;
      
      const cartHandler = async() =>{
        const existItem = cart.cartItems.find((x)=> x._id === product._id);
        const quantity = existItem ? existItem.quantity+1 : 1;
        const {data} = await axios.get(`/api/products/${product._id}`);

        if(data.stock < quantity){
          window.alert('This product is out of stock');
          return;
        }

        contextDispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity},});
      
        navigate('/cart');
      };

    return (
      <div className="productScreen-container">
        <title>{product.name}</title>
        {loading ? (
        <div>
        Loading...
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="product-container">
          <div className="row">
            <div className="col-image">
              <img className="img-large "src= {product.image} alt={product.name}/>
            </div>
            <div className="col-info">
              <div className="info-container">
                <div className="product-name">
                  <h1>{product.name}</h1>
                </div>
              </div>

              <div className="info-container">
              <Rating rating={product.rating} reviews={product.reviews}/>
              </div>

              <div className="info-container">
                <h1 className="product-price">Price: ${product.price}</h1>
              </div>

              <div className="info-container">
                <h1 className="product-desc">Description:</h1>
                <p className="product-desc">{product.description}</p>
              </div>     
            </div>

           
          </div>

          <div className="col-description">
                <div className="description-row">
                  <div className="description-col">Price:</div>
                  <div className="description-col">${product.price}</div>
                </div>

                <div className="description-row">
                  <div className="description-col">Status:</div>
                  <div className="description-col">
                    {product.stock > 0 ? (
                      <div className="success-badge">In Stock</div>
                    ) : (
                      <div className="fail-badge">Unavailable</div>
                    )}
        
                  </div>
                  {product.stock > 0 && (
                    <div className="col-description">
                      <div className="d-grid">
                        <button onClick= {cartHandler} className="btn-cart">Add to Cart</button>
                      </div>
                    </div>
                  )}
                </div>
                
            </div>

          
        </div>
      )}
      </div>
    );
    
}