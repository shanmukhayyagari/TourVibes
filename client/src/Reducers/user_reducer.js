import { loginUser } from '../Actions/actions';
import {LOGIN_USER,REGISTER_USER,LOGOUT_USER, AUTH_USER,ADD_TO_CART,GET_CART_DETAILS,REMOVE_CART_ITEM,ON_SUCCESS_BUY} from  '../Actions/types';

export default function(state={},action){
    // console.log('hi')
    console.log(state);
    switch(action.type){
        case LOGIN_USER:
            return {...state,loginUser:action.payload}

        case REGISTER_USER:
            return {...state,registerUser:action.payload}

        case AUTH_USER:
            return {...state,userData:action.payload}

        case LOGOUT_USER:
            return {...state};
        
        case ADD_TO_CART:
            return  {...state,userData:{
                ...state.userData,
                data:{
                    ...state.userData.data,
                    cart:action.payload.data.cart
                }
            },cartInfo:action.payload}

        case GET_CART_DETAILS:
            return {...state,cartDetails:action.payload}

        case REMOVE_CART_ITEM:
            return {...state,
                cartDetails: action.payload.cartDetails,
                userData: {
                    ...state.userData,
                    
                    data:{
                        ...state.userData.data,
                        cart:action.payload.cart
                    }
                }
            }

        case ON_SUCCESS_BUY:
            // console.log('on success');
            return{
                ...state,
                userData:{
                    ...state.userData,
                    data:{
                        ...state.userData.data,
                        cart:action.payload.cart,
                    },
                    
                },
                cartDetails:action.payload.cartDetail
            }

    
        default :
            return state;

    }
}