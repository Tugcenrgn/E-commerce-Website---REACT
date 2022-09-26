import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
//import data from "../data";
import axios from 'axios';
import logger from 'use-reducer-logger';
import Product from "../components/product";
import './homeScreen.css';


const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return{...state, loading: true};
    case 'FETCH_SUCCESS':
      return {...state, products: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default function HomeScreen(){
  const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  })

  //const [products, setProducts] = useState([]);
  useEffect(() =>{
    const fetchData = async () => {
      dispatch({type:'FETCH_REQUEST'});
      try{ 
        const result = await axios.get('/api/products');
        dispatch({type:'FETCH_SUCCESS', payload: result.data});
      }catch(err){
        dispatch({type: 'FETCH_FAIL', payload: err.message});
      }
      //setProducts(result.data);
    };
    fetchData();
  }, [])
    return (

      <div className="homeScreen-container">
            <title>Shoppinol</title>
            <h1 className="homeScreen-title">Products</h1>
      <div className="products">
      {
        loading ? (<div>Loading...</div>): error ? (<div>{error}</div>) : (
       
          products.map((product) => (
            <div className="products-container"  key={product.slug}>
              <Product product={product}></Product>
            </div>
           
            ))
   
        )}
      </div>
        </div>
    )
}
