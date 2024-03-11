import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { getCartDetails } from '../../../Actions/actions';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { removeCartItem,onSuccessBuy } from '../../../Actions/actions';
import Paypal from '../../utils/Paypal';
import axios from 'axios';
import { Result, Empty } from 'antd';
import { addToCart } from '../../../Actions/actions';
import { PlusOutlined,PoweroffOutlined } from '@ant-design/icons';

function CartPage(){

    const dispatch = useDispatch(); 
    const state = useSelector(state=>state.user);
    const [total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)
    const [loading,setLoading] = useState(true);

    const history = useHistory();

    useEffect(()=>{
        console.log("cart")
        if(state.userData && state.userData.data.cart){
            // console.log(state.userData)
        dispatch(getCartDetails(state.userData.data.cart)).then(res=>{
            // console.log(res.payload);
            calculateTotal(res.payload)
            setLoading(false);
        });
    }
    },[state.userData]);

    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:6200/${image}`
        }
    }

    const calculateTotal = (cartDetail) => {
        let tot = 0;

        cartDetail.map(item => {
            tot += parseInt(item.price, 10) * item.quantity
        });

        setTotal(tot)
        if(ShowSuccess == false)
        setShowTotal(true)
    }

    const removeItem = (product)=>{
        console.log('Cart Item removed');

        dispatch(removeCartItem(product._id)).then(res=>{
            console.log(res);
        }
            );
    
    }

    const addToCartHandler = (product)=>{
        console.log('Cart');

        dispatch(addToCart(product._id)).then(res=>{
            console.log(res.payload.data.success);
            // history.push('/cart');
        }
        );
    }

    const renderItems = (products) => (
      products && products.map(product => (
            <tr key={product._id}>
                <td>
                    <img style={{ width: '100px' }} alt="product" 
                    src={renderCartImage(product.images[0])} />
                </td> 
                <td>{product.quantity}</td>
                <td>$ {product.price} </td>
                <td> <Button size="large" shape="round" type="danger" onClick={()=>addToCartHandler(product)}
                    ><PlusOutlined />
                    </Button></td>
                <td> <Button size="large" shape="round" type="danger" onClick={()=>removeItem(product)}
                    >Remove
                    </Button></td>

            </tr>
        ))
    )

    const transactionSuccess = (payment) => {
        
        let variables = {
            cartDetail:state.cartDetails,
            paymentData:payment,
        }

        axios.post('/api/users/successBuy',variables).then(res=>{
            if(res.data.success){
                setShowSuccess(true);
                setShowTotal(false);
                console.log(res.data.cart,1);
                dispatch(onSuccessBuy({cart:res.data.cart,cartDetail:res.data.cartDetail}))
                // console.log('came')
            }
            else{
                alert('Failed to buy');
            }
        });


    }

    return (
        // {state.}
        <div style={{display:"flex",justifyContent:'center',marginTop:'160px'}}>
            {loading?<Button type="primary" icon={<PoweroffOutlined />} loading />:
        <div style={{width: '85%',display:"flex",flexDirection: 'column',justifyContent:'center',marginTop:'10px'}}>
        { state.userData && state.userData.data && state.userData.data.cart.length ?
            <table >
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Add Quantity</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems(state.cartDetails)}
                </tbody>
            </table>:<p></p>
        }

            {/* <h2>Total Amount: Rs {total}</h2> */}
            {state.userData && state.userData.data && state.userData.data.cart.length ?
                    <div style={{ marginTop: '3rem' }}>
                        <h3>Total amount: ${total} </h3>
                    </div>
                    :
                    ShowSuccess ?
                        <Result
                            status="success"
                            title="Successfully Purchased Items"
                        /> :
                        <div style={{
                            width: '100%', display: 'flex', flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <br />
                            <Empty description={false} />
                            <p>No Items In the Cart</p>

                        </div>
                }
            {/* {total==0?'':  <Button style={{marginBottom:'30px'}} onClick={()=>{alert('Successfully purchased');history.push('/')}} size="large" shape="round" type="danger">Purchase</Button>} */}
            {state.userData && state.userData.data && state.userData.data.cart.length ? <div style={{marginBottom:30}}>
                <Paypal
                    toPay={total}
                    onSuccess={transactionSuccess}
                />
            </div>:<p></p>
            }
        </div>
    }
        </div>
    )

}

export default CartPage;