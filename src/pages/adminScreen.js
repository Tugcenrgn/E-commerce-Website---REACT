import { useContext,  useReducer } from "react";
import { Store } from "../Store";


const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          summary: action.payload,
          loading: false,
        };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };


export default function AdminScreen() {
    const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
      });
      const { state } = useContext(Store);
      const { userInfo } = state;


    return(
        <div>
           <title>Admin Panel</title>
            Admin Panel
        </div>
    )
}