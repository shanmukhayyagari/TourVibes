import {LOGIN_USER,REGISTER_USER,LOGOUT_USER,AUTH_USER,ADD_TO_CART,GET_CART_DETAILS,REMOVE_CART_ITEM,ON_SUCCESS_BUY} from './types';
import axios from 'axios';

// axios.defaults.withCredentials = true;

export function loginUser(data){

    const res=axios.post('/api/users/login',data);
    
    return {
        type:LOGIN_USER,
        payload:res
    }
}

export function registerUser(data){

    const res=axios.post('/api/users/register',data);

    return {
        type:REGISTER_USER,
        payload:res
    }
}

export function logoutUser(){

    console.log('logout');
    const res=axios.get('http://localhost:3000/api/users/logout');
    console.log(res);

    return {
        type:LOGOUT_USER,
        payload:res
    }

}

export function auth(){

    const res = axios.get('/api/users/auth');

    return{
        type:AUTH_USER,
        payload:res
    }

}

export function addToCart(productId){

    const res = axios.post('/api/users/addToCart',{productId:productId});

    return{
        type:ADD_TO_CART,
        payload:res
    }

}

export function getCartDetails(data){

    const array=[];

    data.map(d=>array.push(d.id));

    const res = axios.post('/api/product/getCartDetails',{array:array}).then(res=>{

        data.map((da)=>{
            res.data.docs.map((re,index)=>{
                if(da.id === re._id){
                    res.data.docs[index].quantity = da.quantity;
                }
            })
        })

        return res.data.docs;
    });

    return{
        type:GET_CART_DETAILS,
        payload:res
    }

}

export function removeCartItem(productId){

    const res = axios.post('/api/users/removeCartItem',{id:productId}).then(response=>{
        response.data.cart.forEach(item => {
            response.data.cartDetails.forEach((k, i) => {
                if (item.id === k._id) {
                    response.data.cartDetails[i].quantity = item.quantity
                }
            })
        })
        return response.data;
    });

    return{
        type:REMOVE_CART_ITEM,
        payload:res
    }

}

export function onSuccessBuy(data){
    return{
        type: ON_SUCCESS_BUY,
        payload:data
    }
} 