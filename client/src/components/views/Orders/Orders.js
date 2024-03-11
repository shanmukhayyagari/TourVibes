import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row,Col,Card,Modal,Button } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Empty,notification } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const openNotification = () => {
  notification.open({
    message: 'Notification',
    description:
      'Successfully Delivered.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

const { Meta } =  Card;

const Orders = () => {

    const user = useSelector(state=>state.user);
    const history = useHistory();

    const [orders,setOrders] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ord,setOrder] = useState({product:[]});
    const [loading,setLoading] = useState(true);

    const getOrders = ()=>{
        axios.get('http://localhost:3000/api/users/getOrders').then(res=>{
            if(res.data.success){
                setOrders(res.data.orders)
                setLoading(false);
                console.log(orders,1);
            }
            else{
                alert('Failed to fetch orders');
            }
        })
    }

    useEffect(()=>{

        // console.log(user.userData?.data?.email)
        if(user && user.userData && user.userData.data && user.userData.data.email != "admin@gmail.com"){
            history.push('/');
            // console.log("Upload  Product")
        }
        // openNotification();

    },[user.userData]);

    const showModal = (order) => {
        setOrder(order);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setOrder({product:[]});
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setOrder({product:[]});
    };

    const deleteOrder = (order) => {
        axios.post('http://localhost:3000/api/users/deleteOrder',{_id:order._id}).then(res=>{
            if(res.data.success){
                // alert('Successfully delivered')
                openNotification();
                getOrders();
            }
            else{
                alert('Failed to delete the order');
            }
        })
    }

    const renderOrders =
        // console.log('HHHH');
        orders.map(order=>{
                return <Col lg={6} md={8} xs={24}>
                <Card
                    hoverable={true}
                    // cover={<a href={`/product/${p._id}`} ><ImageSlider images={p.images} /></a> }
                >
                    <Meta
                        title={order.user[0].name}
                        style={{marginBottom:'30px'}}
                    />

                    <Button style={{marginRight:'2px'}} type="primary" onClick={()=>showModal(order)}>
                        View Products
                    </Button>
                    <Modal title="Products" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        {
                            ord?.product.map(prod=>{
                                return(
                                <div>
                                    <div>{prod.name} - {prod.quantity} * ${prod.price}</div>
                                    {/* <div>$ {prod.price}</div> */}
                                </div>
                                )
                            })
                        }
                    </Modal>

                    <Button type="danger" onClick={()=>deleteOrder(order)}>
                        Delivered/Done
                    </Button>
            
                </Card>
            </Col>
            });

    useEffect(()=>{

        getOrders();

    },[]);

    return(
        <div style={{marginTop:'130px'}}>
            {
                loading?<Button type="primary" icon={<PoweroffOutlined />} loading />:
                orders.length ? (<div><h2>Orders Page</h2>
                <Row style={{marginTop:"70px"}} gutter={[16, 16]}>
                            {renderOrders}
                </Row></div>) : <Empty/>
            }
            
           
        </div>
    )

}

export default Orders;